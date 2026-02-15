const Trade = require('../models/Trade');

// @desc    Get all trades
// @route   GET /api/trades
const getTrades = async (req, res) => {
    try {
        // Find all trades and sort them by date (newest first)
        const trades = await Trade.find().sort({ date: -1 }); 
        res.status(200).json(trades);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Create a new trade
// @route   POST /api/trades
const addTrade = async (req, res) => {
    try {
        const trade = await Trade.create(req.body);
        res.status(201).json(trade);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getTrades,
    addTrade
};