const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

// router.get('/create', userController.create_user);
router.get('/create/password', userController.isLoggedIn, userController.create_password_render);
router.post('/create/password',  userController.isLoggedIn, userController.create_password);
router.get('/change/password', userController.isLoggedIn, userController.change_password_render);

router.get('/profile', userController.isLoggedIn, userController.profile);
router.get('/logout', userController.isLoggedIn, userController.logout);
module.exports = router; 