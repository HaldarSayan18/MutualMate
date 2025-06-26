const jwt = require('jsonwebtoken');
const userModel = require("../model/userModel");
const generateAccessToken = require("../utils/createToken");

// get login details
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send('User not found!')
        };
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: '3d',
        });
        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (error) {
        console.log('Login failed!');
        console.log(error);
    }
};

// get registartion details
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        // const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY, {
        //     expiresIn:"7d",
        // })
        res.status(201).json({
            success: true,
            token,
            newUser
        });
    } catch (error) {
        console.log('Registration failed!', error);
        res.status(500).json({ error: "Registration failed!" });
    }
};

// Save mutual fund for logged-in user
const saveMutualFund = async (req, res) => {
    try {
        const { userId, fund } = req.body;
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        user.savedItems.push(fund);
        await user.save();

        res.status(200).json({ success: true, savedItems: user.savedItems });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save mutual fund' });
    }
};

// Get saved items
const getSavedItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ savedItems: user.savedItems });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching saved items' });
    }
};

// Delete save items
const deleteSavedFund = async (req, res) => {
    try {
        const { userId, schemeCode } = req.params;
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Remove fund by schemeCode
        user.savedItems = user.savedItems.filter(item => item.schemeCode !== schemeCode);
        await user.save();

        res.status(200).json({ success: true, savedItems: user.savedItems });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete mutual fund' });
    }
};


module.exports = { loginController, registerController, saveMutualFund, getSavedItems, deleteSavedFund };