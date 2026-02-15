const mongoose = require('mongoose');

const tradeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // This links the trade to a specific client
    },
    script: {
        type: String,
        required: true // e.g., "NIFTY 25000 CE"
    },
    type: {
        type: String,
        required: true,
        enum: ['BUY', 'SELL']
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Completed',
        enum: ['Completed', 'Holding'] // Matches your dashboard badges
    },
    pnl: {
        type: Number,
        default: 0 // Profit or Loss for this specific trade
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Trade', tradeSchema);