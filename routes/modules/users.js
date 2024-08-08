const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// 使用者資料庫相關設置
const db = require("../../models");
const User = db.User;

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { email, password } = req.body;

  return User.count({ where: { email } })
    .then((rowCount) => {
      if (rowCount > 0) {
        req.flash("error", "email已註冊");
        return;
      }
      return bcrypt.hash(password, 10).then((hash) => {
        console.log(hash);
        User.create({ email, password: hash });
      });
    })
    .then((user) => {
      if (!user) {
        return res.redirect("back");
      }
      req.flash("success", "註冊成功");
      return res.redirect("/login");
    });
});

router.get("/logout", (req, res) => {
  res.send("logout user");
});

module.exports = router;
