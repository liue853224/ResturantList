// 定義
const express = require("express");
const router = express.Router();

// 引進路由
const restaurants = require("./restaurants");

// 使用路由
router.use("/restaurants", restaurants);

router.get("/", (req, res) => {
  res.redirect("/restaurants");
});

module.exports = router;
