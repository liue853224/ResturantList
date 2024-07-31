const express = require("express");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  //   const keyword = req.query.search?.trim();
  //   const matchedRestaurant = keyword
  //     ? restaurants.filter((restaurant) => {
  //         return (
  //           restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
  //           restaurant.category.includes(keyword)
  //         );
  //       })
  //     : restaurants;
  //   if (matchedRestaurant.length === 0) {
  //     res.render("empty", { keyword });
  //   } else res.render("index", { restaurants: matchedRestaurant, keyword });
  res.render("index");
});

router.get("/:id", (req, res) => {
  //   const id = Number(req.params.id);
  //   const restaurant = restaurants.find((restaurant) => restaurant.id === id);
  res.render("detail", { restaurant });
});

router.post("/new", (req, res) => {
  res.render("new");
});

router.get("/edit", (req, res) => {
  res.render("edit");
});

router.put("/:id", (req, res) => {
  res.render(null);
});

router.delete("/:id", (req, res) => {
  res.render(null);
});

module.exports = router;
