const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

// ajout des routes crées dans controllers/user à notre router 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;