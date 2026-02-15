const express = require('express');
const router = express.Router();
const LedgerEntry = require('../models/LedgerEntry');

router.get('/', async (req, res) => {
    try {
        // Get entries sorted by date
        const entries = await LedgerEntry.find().sort({ date: 1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;