const express = require('express');
const router = express.Router();

const subController = require('../controllers/subscribe_controller');
const userController = require('../controllers/user_controller');

router.get('/type', subController.type);
router.get('/user-details/:cost', userController.isLoggedIn, subController.user_details);
router.post('/user-details/:cost', subController.save_user_details);

router.get('/pay/:cost', userController.isLoggedIn, subController.payment);
router.post('/create-payment-order',  userController.isLoggedIn, subController.create_payment_order);
router.post('/verify-payment/:cost',  userController.isLoggedIn, subController.verify_payment);

module.exports = router;