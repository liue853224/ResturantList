const express = require("express");
const router = express.Router();

// 使用者資料庫相關設置
const db = require("./models");
const users = db.users;

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  res.send("send user data");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  res.send("create user data");
});

router.get("/logout", (req, res) => {
  res.send("logout user");
});

module.exports = router;
