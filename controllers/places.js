const Place = require('../models/place');

function placesIndex(req, res, next) {
  console.log('got here');
  Place
    .find()
    .populate('createdBy')
    .exec()
    .then(places => res.json(places))
    .catch(next);
}

function placesCreate(req, res, next) {
  req.body.createdBy = req.currentUser;
  Place
    .create(req.body)
    .then(place => res.status(201).json(place))
    .catch(next);
}

function placesShow(req, res, next) {
  Place
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      res.json(place);
    })
    .catch(next);
}

function placesUpdate(req, res, next) {
  Place
    .findById(req.params.id)
    .populate('createdBy')

    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      place = Object.assign(place, req.body);
      return place.save();
    })
    .then(place => res.json(place))
    .catch(next);
}

function placesDelete(req, res, next) {
  Place
    .findById(req.params.id)
    .populate('createdBy') //potentially remove this
    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      return place.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: placesIndex,
  create: placesCreate,
  show: placesShow,
  update: placesUpdate,
  delete: placesDelete
};
