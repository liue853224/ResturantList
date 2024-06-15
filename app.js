// 定義
const express = require("express");
const app = express();
const port = 3000;

// 設置
app.use(express.static("public"));

// Listen
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
