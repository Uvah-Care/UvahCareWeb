const express = require('express');
const router = express.Router();

const subController = require('../controllers/subscribe_controller');
const userController = require('../controllers/user_controller');

router.get('/type', subController.type);
router.get('/user-details/:sub_name', userController.isLoggedIn, subController.user_details);
router.post('/user-details/:sub_name', subController.save_user_details);

router.get('/pay/:sub_name', userController.isLoggedIn, subController.payment);
router.post('/create-payment-order/:cost',  userController.isLoggedIn, subController.create_payment_order);
router.post('/verify-payment/:sub_name',  userController.isLoggedIn, subController.verify_payment);

// router.post('/make-new-sub', subController.make_new_sub);
// router.post('/make-new-exp', subController.make_new_expert);

module.exports = router;