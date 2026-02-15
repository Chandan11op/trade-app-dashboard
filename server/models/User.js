const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  mob_num: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  percentage: {
    type: Number,
    default: 0
  },
  current_balance: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
