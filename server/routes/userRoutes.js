const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Define routes and connect them to controller functions
router.post("/create", (req, res) => {
    console.log("CREATE USER API HIT");
    res.status(201).json({ msg: "User route working" });
});

router.post("/login", loginUser);

module.exports = router;