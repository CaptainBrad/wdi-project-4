const router = require('express').Router();
const places  = require('../controllers/places');
// const auth  = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');
// uncomment ^

router.route('/places')
  .get(places.index)
  .post(places.create);
// //set secure route ^
//
router.route('/places/:id')
  .get(places.show)
  .put(places.update)
//   //set secure route ^
  .delete(places.delete);
// //set secure route ^
//
// router.route('/register')
//   .post(auth.register);
//
// router.route('/login')
//   .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
