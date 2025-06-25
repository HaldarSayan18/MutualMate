const express = require('express');
const { loginController, registerController, saveMutualFund, getSavedItems } = require('../controllers/userController');

// router object
const router = express.Router();

// POST || login
router.post('/login', loginController);
// POST || register
router.post('/register', registerController);
// POST || save funds
router.post('/save', saveMutualFund);
// POST || get saved-funds
router.get('/save/:userId', getSavedItems);

module.exports = router;