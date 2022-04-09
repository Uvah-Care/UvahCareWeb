const express = require('express');
const router = express.Router();

const joinController = require('../controllers/join_controller');

router.get('/', joinController.register);
module.exports = router;