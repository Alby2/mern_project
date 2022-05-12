const router = require('express').Router();
const authCntrl = require('../controllers/auth.controller')

//Inscription
router.post('/register',authCntrl.ins);


//Connexion
router.post('/login',authCntrl.login)

//Logout
router.get('/logout',authCntrl.logout)

module.exports = router