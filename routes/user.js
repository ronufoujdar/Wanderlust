const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllar/user.js")

//signup form
// signup route
router.route("/signup")
  .get(userController.signupform)
  .post(wrapAsync(userController.signup));
  

// login form
// login route
router.route("/login")
  .get(userController.loginform)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }), userController.login);


router.get("/logout", userController.logout);

module.exports = router;