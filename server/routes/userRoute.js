const express = require('express');
const { loginController, registerController, saveMutualFund, getSavedItems, deleteSavedFund } = require('../controllers/userController');
const auth = require('../middleware/auth');

// router object
const router = express.Router();

// POST || login
router.post('/login', loginController);
// POST || register
router.post('/register', registerController);
// POST || save funds
router.post('/save', auth, saveMutualFund);
// POST || get saved-funds
router.get('/save/:userId', auth, getSavedItems);
// POST || delete saved-funds
router.delete('/delete/:userId/:schemeCode', auth, deleteSavedFund);

module.exports = router;