const express = require('express');
const router = express.Router();
const { getTrades, addTrade } = require('../controllers/tradeController');

// This maps the root URL (/) to our controller functions
router.route('/').get(getTrades).post(addTrade);

module.exports = router;