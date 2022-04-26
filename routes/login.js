const express = require('express');
const passport = require('passport')
require('../config/auth_google');
// const db = require('../');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/', userController.login);
router.get('/google',
    passport.authenticate('google', {scope: ['email', 'profile'] } )
);
router.post('/local',
    passport.authenticate('local',{
        successRedirect: '/login/check',
        failureRedirect: '/login/failure',
    })
); 

router.get('/google/callback', 
    passport.authenticate('google',{
        successRedirect: '/login/check',
        failureRedirect: '/login/failure',
    })
// userController.login_google_callback
);
router.get('/check', userController.isLoggedIn, userController.login_check);
router.get('/failure', userController.login_failure);

module.exports = router; 