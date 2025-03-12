const mongoose = require('mongoose');
require('dotenv').config();
async function connectToDataBase() {
    
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected successfully!')
}
module.exports = connectToDataBase;