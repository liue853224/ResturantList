// 定義
const express = require("express");
const app = express();
const port = 3000;
const { engine } = require("express-handlebars");
const restaurants = require("./public/jsons/restaurant.json").results;

// 設置
app.use(express.static("public"));
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//route
app.get("/", (req, res) => {
  res.redirect("/Restaurants");
});

app.get("/Restaurants", (req, res) => {
  res.render("index");
});

app.get("/Restaurants/:id", (req, res) => {});

// Listen
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
