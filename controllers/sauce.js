const Sauce = require('../models/Sauces');
const fs = require('fs');


exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  console.log(sauceObject);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Sauce enregistrée !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAll = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likedSauce = (req, res, next) => {
  Sauce.findOne(
    { _id: req.params.id }
  ).then(sauce => {
    if (req.body.like == 1) {
      sauce.likes++;
      sauce.usersLiked.push(req.body.userId);
      console.log(req.body.userId);
    } else if (req.body.like == -1) {
      sauce.dislikes++;
      sauce.usersDisliked.push(req.body.userId);
    } else if (req.body.like == 0) {
      if (sauce.usersLiked.some(userId => userId == req.body.userId)) {
        sauce.likes--;
        sauce.usersLiked = sauce.usersLiked.filter(userId => userId != req.body.userId);
      } else {
        sauce.dislikes--;
        sauce.usersDisliked = sauce.usersDisliked.filter(userId => userId != req.body.userId);
      }
    } else {
      res.status(400).json({ message: 'Erreur dans la requête' })
    }
    sauce.save().then(() => {
      res.status(200).json({ message: 'Like ajouté !' })
    })
  }).catch((error) => {
    res.status(400).json({
      error: error
    });
  });

}
