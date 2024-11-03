const mongoose = require('mongoose');
// const mongodbURL = 'mongodb://localhost:27017/voting';

require('dotenv').config();
const mongodbURL = process.env.MONGODB_URL_LOCAL;

mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB');
});

db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB');
});

db.on('error',(error)=>{
    console.log('Connection Error',error);
});

module.exports = db;