const express = require('express');
const { loginController, registerController, saveMutualFund, getSavedItems, deleteSavedFund } = require('../controllers/userController');
const auth = require('../middleware/auth');

// router object
const router = express.Router();

// POST || login
router.post('/users/login', loginController);
// POST || register
router.post('/users/register', registerController);
// POST || save funds
router.post('/users/save', auth, saveMutualFund);
// POST || get saved-funds
router.get('/users/save/:userId', auth, getSavedItems);
// POST || delete saved-funds
router.delete('/users/delete/:userId/:schemeCode', auth, deleteSavedFund);

module.exports = router;