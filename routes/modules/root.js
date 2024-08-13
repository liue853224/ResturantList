const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.redirect("/restaurants");
});

router.get("/login", (req, res) => {
  console.log("session:" + req.session);
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/restaurants",
    failureRedirect: "/users/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  res.send("logout user");
});

module.exports = router;
