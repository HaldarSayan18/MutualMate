const userModel = require("../model/userModel");

// get login details
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send('User not found!')
        };
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.log('Error in fetching login credentials.');
        console.log(error);
    }
};

// get registartion details
const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            newUser
        });
    } catch (error) {
        console.log('Error occurs in registration.');
        console.log(error);
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

module.exports = { loginController, registerController, saveMutualFund, getSavedItems };