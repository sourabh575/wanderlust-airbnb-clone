const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/user');

// GET signup page
router.get("/signup", userController.renderSignupForm);

// POST signup logic
router.post("/signup", userController.signup);

// GET login page
router.get("/login", userController.renderLoginForm);

// POST login logic
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: '/login',
    failureFlash: true,
  }),
  userController.login
);

// GET logout
router.get("/logout", userController.logout);

module.exports = router;
