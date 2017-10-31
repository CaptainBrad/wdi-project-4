const router = require('express').Router();
const places  = require('../controllers/places');
const auth  = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const oauth  = require('../controllers/oauth');
const imageUpload = require('../lib/imageUpload');

router.route('/places')
  .get(places.index)
  .post(imageUpload, secureRoute, places.create);

// //set secure route ^
//
router.route('/places/:id')
  .get(places.show)
  .put(imageUpload, secureRoute, places.update)
//   //set secure route ^
  .delete(secureRoute, places.delete);
// //set secure route ^
//
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.route('/places/:id/comments')
  .post(secureRoute, places.addComment);

router.route('/places/:id/comments/:commentId')
  .delete(secureRoute, places.deleteComment);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
