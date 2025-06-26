const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/DB');
require('colors');

// config env file
dotenv.config();

// database call
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/mutualmate/users', require('./routes/userRoute'));


// port
const PORT = process.env.PORT || 8050;

// server
app.listen(PORT, ()=>{
    console.log(`Server is running on https://mutualmate-server.onrender.com/${PORT}`.bgYellow);
});