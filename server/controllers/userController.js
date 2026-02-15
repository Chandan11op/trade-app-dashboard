const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc    Register a new user (Admin only)
// @route   POST /api/users/create
// @access  Public (or Protected if you add auth middleware later)
const registerUser = async (req, res) => {
  try {
    const { user_name, mob_num, password, percentage } = req.body;

    const existing = await User.findOne({ mob_num });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      user_name,
      mob_num,
      password: hashedPassword,
      percentage,
      current_balance: 0,
      status: "active"
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { mob_num, password } = req.body;

    const user = await User.findOne({ mob_num });
    if (!user) return res.status(400).json({ msg: "Invalid mobile number" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, mob_num: user.mob_num },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
        token, 
        user: {
            id: user._id,
            user_name: user.user_name,
            mob_num: user.mob_num,
            status: user.status
        }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser };