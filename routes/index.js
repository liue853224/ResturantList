// 定義
const express = require("express");
const router = express.Router();

// 引進路由
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");
const root = require("./modules/root");

// 使用路由
router.use("/", root);
router.use("/users", users);
router.use("/restaurants", restaurants);

module.exports = router;
