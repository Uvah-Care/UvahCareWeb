const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller')

router.get('/', homeController.home);
router.get('/contact', homeController.contact);
router.get('/about', homeController.about);
router.get('/experts', homeController.experts);
router.get('/terms-of-service', homeController.terms_of_service);
router.get('/privacy-policy', homeController.privacy_policy);

router.use('/user', require('./user'));
router.use('/subscribe', require('./subscribe'));
// router.use('/join',require('./join'));
// router.use('/login',require('./login'));

router.use(
    (req,res,next)=>{
        res.status(404).render('404', {user: req.user});
    }
)

module.exports = router; 