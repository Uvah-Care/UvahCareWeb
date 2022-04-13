const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);
router.get('/contact', homeController.contact);
router.get('/about', homeController.about);
router.get('/experts', homeController.experts);
router.use('/join',require('./join'));
router.use('/login',require('./login'));
router.use('/user', require('./user'))

module.exports = router; 