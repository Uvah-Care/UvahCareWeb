const express = require('express');
const router = express.Router();

const joinController = require('../controllers/join_controller');

router.get('/', joinController.registerForm);
router.get('/pay', joinController.payment);
router.post('/form-register', joinController.register);
router.post('/create-payment-order', joinController.create_payment_order);
router.post('/verify-payment', joinController.verify_payment);

module.exports = router;