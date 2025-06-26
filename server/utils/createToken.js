const jwt = require('jsonwebtoken');

// function to generate access token
const generateAccessToken=(userId)=>{
    return jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn:"7d",
    })
};

module.exports = generateAccessToken;