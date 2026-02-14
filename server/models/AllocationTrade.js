const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
    master_trade_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trade",
        required: true
    },
    mob_num: {
        type: String,
        required: true
    },
    quantity: Number,
    buy_price: Number,
    sell_price: Number,
    pnl: Number,
    status: {
        type: String,
        default: "open"
    }
}, { timestamps: true });

allocationSchema.index({ mob_num: 1 });

module.exports = mongoose.model("AllocationTrade", allocationSchema);
