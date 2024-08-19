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
    failureRedirect: "/login",
    failureFlash: true,
  })
);

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/logout", (req, res) => {
  req.logout((error) => {
    if (error) {
      next(error);
    }
    return res.redirect("/login");
  });
});

module.exports = router;
