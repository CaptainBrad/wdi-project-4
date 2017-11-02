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

  if(req.file) req.body.image = req.file.filename;

  req.body.createdBy = req.currentUser;
  Place
    .create(req.body)
    .then(place => res.status(201).json(place))
    .catch(next);
}

function placesShow(req, res, next) {
  Place
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((place) => {
      if(!place) return res.notFound();
      res.json(place);
    })
    .catch(next);
}

function placesUpdate(req, res, next) {

  if(req.file) req.body.image = req.file.filename;

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

function addComment(req, res, next) {
  req.body.createdBy = req.currentUser;

  Place
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((place) => {
      place.comments.push(req.body);
      return place.save((err) => console.log(err));
    })
    .then((place) => {
      res.json(place);
    })
    .catch(next);
}

function deleteComment(req, res, next) {
  req.body.createdBy = req.currentUser;
  Place
    .findById(req.params.id)
    .exec()
    .then((place) => {
      if(!place) return res.notFound();

      const comment = place.comments.id(req.params.commentId);
      comment.remove();

      return place.save();
    })
    .then((place) => res.json(place))
    .catch(next);
}

module.exports = {
  index: placesIndex,
  create: placesCreate,
  show: placesShow,
  update: placesUpdate,
  delete: placesDelete,
  addComment: addComment,
  deleteComment: deleteComment
};
