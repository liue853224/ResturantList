// 定義
const express = require("express");
const router = express.Router();

// 引進路由
const restaurant = require("./restaurants");

// 使用路由
router.use("/Restaurants", restaurant);

router.get("/", (req, res) => {
  res.redirect("/restaurants");
});

module.exports = router;
