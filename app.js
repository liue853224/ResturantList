// 定義
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");

// 模板引擎
const { engine } = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// 讓express取得網址中的資料
app.use(express.urlencoded({ extended: true }));

// 讓表單可以使用PUT Method功能
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// 設置靜態資料來源
app.use(express.static("public"));

//使用route
app.use(router);

// Listen
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
