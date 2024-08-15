const mongoose = require('mongoose')
require('dotenv').config();
const mongoURI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URL,{
    dbName: process.env.DB_NAME
}).then(
    () => {
        console.log('Connected to database');
        console.log('MongoDB URI:', mongoURI);
    }
).catch((err) => {
    console.log('Error connecting to database ' + err);
})