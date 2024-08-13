const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// 使用者資料庫相關設置
const db = require("../../models");
const User = db.User;

router.post("/", (req, res) => {
  const { email, password } = req.body;

  return User.count({ where: { email } }).then((rowCount) => {
    if (rowCount > 0) {
      req.flash("error", "email已註冊");
      return res.redirect("back");
    }
    return bcrypt.hash(password, 10).then((hash) => {
      console.log(hash);
      return User.create({ email, password: hash }).then((user) => {
        if (!user) {
          return res.redirect("back");
        }
        req.flash("success", "註冊成功");
        return res.redirect("/login");
      });
    });
  });
});

module.exports = router;
