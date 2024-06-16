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
