const express = require('express');
const passport = require('passport')
require('../config/auth_google');
// const db = require('../');
const router = express.Router();

const userController = require('../controllers/user_controller');

//get login page
router.get('/', userController.login);

//authenticate using google
router.get('/google',
    passport.authenticate('google', {scope: ['email', 'profile'] } )
);

//redirecting after authentication
router.get('/google/callback', 
    passport.authenticate('google',{
        successRedirect: '/login/check',
        failureRedirect: '/login/failure',
    })
// userController.login_google_callback
);
//authenticate using email, password
router.post('/local',
    passport.authenticate('local',{
        successRedirect: '/login/check',
        failureRedirect: '/login/failure',
    })
); 

router.get('/check', userController.isLoggedIn, userController.login_check);
//if login failed or user not auth. for a page
router.get('/failure', userController.login_failure);

module.exports = router; 