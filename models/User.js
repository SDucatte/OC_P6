const mongoose = require('mongoose');
//Package s'assurant qu'une seule adresse e-mail puisse se créer un compte
const uniqueValidator = require('mongoose-unique-validator');

// Paramètrage schéma de données attendu pour l'objet User
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);