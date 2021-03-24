const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');


// Connexion à notre base de données mongoDB
mongoose.connect('mongodb+srv://firstDataBase:Ducatte123@openclassroomp6.r88rh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  // Paramètrage des headers pour notamment, prévenir des problèmes de CORS Policy
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use(bodyParser.json());
  
  // Gestion ressource image
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);
  
  module.exports = app;