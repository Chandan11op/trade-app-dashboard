const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Trade = require('./models/Trade');
const LedgerEntry = require('./models/LedgerEntry'); // <--- New
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Trade.deleteMany();
        await User.deleteMany();
        await LedgerEntry.deleteMany(); // <--- Clear old ledger

        const createdUser = await User.create({
            name: 'John Doe',
            email: 'john.doe@client.com',
            password: 'password123',
            clientId: 'XC-1029',
            role: 'client',
            availableMargin: 468450, // Updated closing balance
            isAdmin: false
        });


       // ... inside importData function ...

        // 1. Create ADMIN User
        const adminUser = await User.create({
            name: 'System Administrator',
            username: 'Admin', // <--- Your requested Admin ID
            email: 'admin@broker.com',
            password: 'admin123', // <--- Your requested Admin PW
            clientId: 'ADMIN-001',
            role: 'admin',
            phone: '+91 00000 00000',
            availableMargin: 0
        });

        // 2. Create CLIENT User (Rahul Sharma)
        const clientUser = await User.create({
            name: 'Rahul Sharma',
            username: 'client1',
            email: 'rahul.s@gmail.com',
            password: 'password123',
            clientId: 'XC-1029',
            role: 'client',
            phone: '+91 98765 43210',
            availableMargin: 468450
        });

        // ... update the rest of the seeder to use clientUser._id for trades ...
        const userId = clientUser._id; 
        
        } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();