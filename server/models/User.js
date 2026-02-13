// server/models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // <--- Added
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    clientId: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ['admin', 'client'], 
        default: 'client',
        required: true 
    },
    phone: { type: String, default: '' },
    availableMargin: { type: Number, default: 0 },
    // Profile Picture URL (Default placeholder)
    avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' } 
}, {
    timestamps: true
});

// Method to match password (In production, use bcrypt here)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return enteredPassword === this.password;
};

module.exports = mongoose.model('User', userSchema);