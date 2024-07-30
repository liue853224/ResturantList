// 定義
const express = require("express");
const app = express();
const port = 3000;

// 模板引擎
const { engine } = require("express-handlebars");
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// 餐廳資料來源
const restaurants = require("./public/jsons/restaurant.json").results;

// 資料庫相關設置
const db = require("./models");
const users = db.users;

// 設置靜態資料來源
app.use(express.static("public"));

//route
app.get("/", (req, res) => {
  res.redirect("/Restaurants");
});

app.get("/Restaurants", (req, res) => {
  const keyword = req.query.search?.trim();
  const matchedRestaurant = keyword
    ? restaurants.filter((restaurant) => {
        return (
          restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
          restaurant.category.includes(keyword)
        );
      })
    : restaurants;
  if (matchedRestaurant.length === 0) {
    res.render("empty", { keyword });
  } else res.render("index", { restaurants: matchedRestaurant, keyword });
});

app.get("/Restaurants/:id", (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  res.render("detail", { restaurant });
});

// Listen
app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
