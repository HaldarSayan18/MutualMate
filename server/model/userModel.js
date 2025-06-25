const mongoose = require('mongoose');

// user schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
    },
    contact: {
        type: Number,
        required: [true, 'Your contact number is required'],
    },
    email: {
        type: String,
        required: [true, 'Full name is required'],
    },
    password: {
        type: String,
        required: [true, 'Full name is required'],
    },
    savedItems: [
        {
            schemeCode: String,
            schemeName: String,
            isinGrowth: String,
            isinDivReinvestment: String,
        }
    ],
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;