const express = require('express');
const router = express.Router();
const { loginUser, registerUser, saveSession } = require('../controllers/userController');

// Add a new user
router.post('/register', registerUser);

// GET user info after login
router.get('/login', saveSession);

// Login with an existing user
router.post('/login', loginUser);

module.exports = router;