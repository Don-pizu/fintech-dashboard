// config/db.js 

const mongoose = require('mongoose'); 
const connectDB = async () => { 

if (process.env.NODE_ENV === 'test') {
    console.log('Skipping DB connection in test mode');
    return;
  }
	
try { 
	const conn = await mongoose.connect(process.env.MONGO_URI); 
	console.log(`MongoDB Connected: ${conn.connection.host}`); 
} catch (err) { 
	console.error(`Error: ${err.message}`); 
	process.exit(1); // Stop process if DB fails 
}                                     //Commenting this out so jest (test) can work
}; 
module.exports = connectDB;

