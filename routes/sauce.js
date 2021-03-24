const express = require('express');
const router = express.Router();

// Ajout des middlewares d'authentification et de gestion des fichiers
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// ajout des routes crées dans controllers/sauce à notre router 
router.get('/', auth, sauceCtrl.getAll);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likedSauce);

module.exports = router;