const express = require("express");
const router = express.Router();

// 使用者資料庫相關設置
const db = require("./models");
const users = db.users;

module.exports = router;
