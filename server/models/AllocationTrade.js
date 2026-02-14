const mongoose = require("mongoose");

const allocationTradeSchema = new mongoose.Schema({
  master_trade_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trade"
  },
  mob_num: String,
  allocation_qty: Number,
  allocation_price: Number,
  total_value: Number,
  buy_timestamp: Date,
  exit_price: Number,
  exit_value: Number,
  client_pnl: Number,
  status: String,
  sell_timestamp: Date
});

module.exports = mongoose.model("AllocationTrade", allocationTradeSchema);
