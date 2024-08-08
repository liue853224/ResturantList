const express = require("express");
const router = express.Router();
const db = require("../../models");
const Restaurant = db.Restaurant;

router.get("/", (req, res, next) => {
  console.log(req.session);
  const page = parseInt(req.query.page) || 1;
  const limit = 6;

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
  })
    .then((restaurants) => {
      res.render("index", {
        restaurants: restaurants.slice((page - 1) * limit, page * limit),
        prev: page > 1 ? page - 1 : page,
        next: page + 1,
        page: page,
      });
    })
    .catch((error) => {
      error.errorMessage = "找不到相關資料";
      next(error);
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
      console.log(error);
      req.flash("error", "資料取得失敗");
      return res.redirect("back");
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
    .catch((error) => {
      error.errorMessage = "新增失敗";
      next(error);
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
  })
    .then((restaurant) => {
      console.log(restaurant);
      res.render("edit", { restaurant });
    })
    .catch((error) => {
      req.flash("error", "取得資料失敗");
      return res.redirect("back");
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
        req.flash("success", "修改成功");
        return res.redirect(`/restaurants/${id}`);
      })
      .catch((error) => {
        req.flash("error", "更新失敗");
        return res.redirect("back");
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
  })
    .then((restaurant) => {
      if (!restaurant) {
        req.flash("error", 找不到資料);
        return res.redirect("back");
      }

      return restaurant.destroy().then(() => {
        return res.redirect("/restaurants");
      });
    })
    .catch((error) => {
      req.flash("error", "刪除失敗");
      return res.redirect("back");
    });
});

module.exports = router;
