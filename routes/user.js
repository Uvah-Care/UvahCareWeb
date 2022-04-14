const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

// router.get('/create', userController.create_user);
router.get('/create/password', userController.create_password_render);
router.post('/create/password', userController.create_password);
router.get('/profile', userController.profile);
router.get('/logout', userController.logout);
module.exports = router; 