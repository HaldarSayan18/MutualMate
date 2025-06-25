const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DB);
        console.log(`Database connected on ${mongoose.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`error in connecting DB ==> ${error}`.bgRed);
    }
};
connectDB();

module.exports = connectDB;