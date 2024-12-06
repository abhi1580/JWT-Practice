const express = require("express");
const { login_post, signup_post } = require("../controllers/authController");

const router = express.Router();

// Define the routes
router.post("/login", login_post);
router.post("/signup", signup_post);

module.exports = router;
