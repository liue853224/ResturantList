const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

require("dotenv").config();

passport.use(
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    return User.findOne({
      attributes: ["id", "name", "email", "password"],
      where: { email: username },
      raw: true,
    })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "email錯誤" });
        }
        return bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return done(null, false, { message: "密碼錯誤" });
          }
          return done(null, user);
        });
      })
      .catch((error) => {
        error.errorMessage = "登入失敗";
        return done(error);
      });
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    (acessToken, refreshToken, profile, done) => {
      // console.log("acessToken:" + acessToken);
      // console.log("refreshToken:" + refreshToken);
      // console.log("profile:" + JSON.stringify(profile, null, 2));
      const email = profile.emails[0].value;
      const name = profile.displayName;
      console.log("name:" + name);

      return User.findOne({
        attributes: ["id", "name", "email"],
        where: { email: email },
        raw: true,
      })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          if (!user) {
            const randomPwd = Math.random().toString(36).slice(-8);
            return bcrypt
              .hash(randomPwd, 10)
              .then((hash) => {
                return User.create({ email, name: name, password: hash });
              })
              .then((newUser) => {
                console.log("newUser:" + newUser);
                done(null, {
                  id: newUser.id,
                  name: newUser.name,
                  email: newUser.email,
                });
              });
          }
        })
        .catch((error) => {
          error.errorMessage = "登入失敗";
          return done(error);
        });
    }
  )
);

passport.serializeUser((user, done) => {
  const { id, name, email } = user;
  return done(null, { id, name, email });
});

passport.deserializeUser((user, done) => {
  User.findByPk(user.id)
    .then((user) => {
      done(null, { id: user.id, name: user.name, email: user.email });
    })
    .catch((error) => {
      done(error, null);
    });
});

module.exports = passport;
