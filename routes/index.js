// 定義
const express = require("express");
const router = express.Router();

// 引進路由
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");

// 使用路由
router.use("/users", users);

router.use("/restaurants", restaurants);

router.get("/", (req, res) => {
  res.redirect("/restaurants");
});
module.exports = router;
