const mongoose = require('mongoose');

const ledgerEntrySchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    debit: { type: Number, default: 0 },  // Money going OUT (Payouts/Loss)
    credit: { type: Number, default: 0 }, // Money coming IN (Deposits/Profit)
    balance: { type: Number, default: 0 } // Running balance snapshot
});

module.exports = mongoose.model('LedgerEntry', ledgerEntrySchema);