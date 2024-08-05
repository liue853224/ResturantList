const express = require("express");
const router = express.Router();
const db = require("../models");
const Restaurant = db.Restaurant;

router.get("/", (req, res, next) => {
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

router.get("/new", (req, res) => {
  return res.render("new");
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
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash("error", "找不到相關資料");
      }
      res.render("detail", { restaurant });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/", (req, res, next) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;

  return Restaurant.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  })
    .then(() => {
      req.flash("success", "新增成功!");
      res.redirect("/restaurants");
    })
    .catch((err) => {
      console.error;
    });
});

router.get("/:id/edit", (req, res) => {
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
    console.log(restaurant);
    res.render("edit", { restaurant });
  });
});

router.put("/:id", (req, res) => {
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
  } = req.body;
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
  }).then((restaurant) => {
    return restaurant
      .update({
        name,
        name_en,
        category,
        image,
        location,
        phone,
        google_map,
        rating,
        description,
      })
      .then(() => {
        return res.redirect(`/restaurants/${id}`);
      });
  });
});

router.delete("/:id", (req, res) => {
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
  }).then((restaurant) => {
    return restaurant.destroy().then(() => {
      return res.redirect("/restaurants");
    });
  });
});

module.exports = router;
