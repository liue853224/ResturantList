const express = require("express");
const router = express.Router();
const db = require("../models");
const Restaurant = db.Restaurant;

router.get("/", (req, res) => {
  return Restaurant.findAll({
    attributes: [
      "id",
      "name",
      "name_en",
      "category",
      "image",
      "location",
      "phone",
      "google_map",
      "rating",
      "description",
    ],
    raw: true,
  }).then((restaurants) => {
    res.render("index", { restaurants });
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  return Restaurant.findByPk(id, {
    attributes: [
      "id",
      "name",
      "name_en",
      "category",
      "image",
      "location",
      "phone",
      "google_map",
      "rating",
      "description",
    ],
    raw: true,
  }).then((restaurant) => {
    res.render("detail", { restaurant });
  });
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
