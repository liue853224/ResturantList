// 定義
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/index");
const { engine } = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const flashMessageHandler = require("./middleware/flash-message");
const errorHandler = require("./middleware/error-handle");
const passport = require("passport");
require("./config/passport");
// 加入環境變數
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
  console.log("env", process.env.SESSION_SECRET);
}
// 模板引擎
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

// 讓express取得網址中的資料
app.use(express.urlencoded({ extended: true }));

// 讓表單可以使用PUT Method功能
app.use(methodOverride("_method"));

// 設置靜態資料來源
app.use(express.static("public"));

//使用session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(flash());

// passport初始化與使用session功能
app.use(passport.initialize());
app.use(passport.session());

//使用flash middleware
app.use(flashMessageHandler);

//使用route
app.use(router);

// 使用error middleware
app.use(errorHandler);

// Listen
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
