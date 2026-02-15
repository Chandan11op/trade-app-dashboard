const mongoose = require('mongoose');

const ledgerEntrySchema = mongoose.Schema({
    mob_num: { 
        type: String, 
        required: true 
    },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    debit: { type: Number, default: 0 },
    credit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 }
}, { timestamps: true });
ledgerEntrySchema.index({ mob_num: 1 });

module.exports = mongoose.model('LedgerEntry', ledgerEntrySchema);

