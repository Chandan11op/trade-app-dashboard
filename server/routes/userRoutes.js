const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Define routes and connect them to controller functions
router.post("/create", registerUser);
router.post("/login", loginUser);

module.exports = router;