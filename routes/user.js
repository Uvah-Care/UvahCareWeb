const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/create', userController.create_user);

module.exports = router; 