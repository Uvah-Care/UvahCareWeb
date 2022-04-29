const express = require('express');
const passport = require('passport')
require('../config/auth_google');
require('../config/auth_local');

const router = express.Router();

const userController = require('../controllers/user_controller');

//render signin and signup pages
router.get('/signin', userController.signin);
router.get('/signup', userController.signup);

//google authentication
router.get('/auth/google',     
    passport.authenticate('google', {scope: ['email', 'profile'] } )
)
//redirecting after authentication
router.get('/auth/google/callback', 
    passport.authenticate('google',{
        successRedirect: '/user/check',
        failureRedirect: '/user/failure',
    })
);
//local auth for signup
router.post('/auth/signup/local', userController.checkIfExisted,
    passport.authenticate('local',{
        successRedirect: '/user/check',
        failureRedirect: '/user/failure',
    })
); 
//local auth for signin
router.post('/auth/signin/local',
    passport.authenticate('local',{
        successRedirect: '/user/check',
        failureRedirect: '/user/failure',
    })
); 

//check the user for subscription (new/old user)
router.get('/check', userController.isLoggedIn, userController.login_check);
router.get('/failure', userController.login_failure);

// router.get('/create', userController.create_user);
router.get('/create/password', userController.isLoggedIn, userController.create_password_render);
router.post('/create/password',  userController.isLoggedIn, userController.create_password);
router.get('/change/password', userController.isLoggedIn, userController.change_password_render);

//users profile page and logout options
router.get('/profile', userController.isLoggedIn, userController.profile);
router.get('/logout', userController.isLoggedIn, userController.logout);
module.exports = router; 
