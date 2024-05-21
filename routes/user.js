const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser, getCurrentUser } = require('../controllers/userController');
const { validate, userValidationRules } = require('../middlewares/validation');
const router = express.Router();

// Registro
router.post('/register', userValidationRules(), validate, registerUser);

// Login
router.post('/login', loginUser);

// Logout
router.get('/logout', logoutUser);

// Obtener usuario actual
router.get('/me', passport.authenticate('jwt', { session: false }), getCurrentUser);

module.exports = router;
