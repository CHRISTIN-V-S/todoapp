const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

router.post("/register", userControllers.registeruser);
router.post("/login", userControllers.loginUser);

module.exports = router;