// 定義
const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/auth");

// 引進路由
const restaurants = require("./modules/restaurants");
const users = require("./modules/users");
const root = require("./modules/root");
const oauth = require("./modules/oauth");

// 使用路由
router.use("/", root);
router.use("/users", users);
router.use("/", oauth);
router.use("/restaurants", authHandler, restaurants);

module.exports = router;
