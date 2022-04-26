const express = require('express');
const passport = require('passport')
require('../config/auth_local');

const router = express.Router();

const userController = require('../controllers/user_controller');
const joinController = require('../controllers/join_controller');

router.get('/', joinController.registerForm);
router.get('/pay', userController.isLoggedIn, joinController.payment);

// router.post('/form-register', function(req,res, next){
//     console.log(req.url);
//     passport.authenticate('local', function(error, user,info){
//         console.log("authenticate");
//         console.log(error);
//         console.log(user);
//         console.log(info);
//     })(req,res,next);
// })

router.post('/form-register', userController.checkIfExisted,
    passport.authenticate('local',{
        successRedirect: '/login/check',
        failureRedirect: '/login/failure',
    })
); 
    // ,joinController.register);
router.post('/create-payment-order',  userController.isLoggedIn, joinController.create_payment_order);
router.post('/verify-payment',  userController.isLoggedIn, joinController.verify_payment);
// router.post('/after-payment', joinController.successful_payment)

module.exports = router; 