const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const Place      = require('../models/place');

const placeData = [{
  name: 'Hackney Farm',
  subtitle: 'Totally free, just dont adopt an animal ',
  image: 'http://www.growingcity.co.uk/wp-content/uploads/2012/02/IMG_09001.jpg',
  latLng: {
    lat: 51.557240,
    lng: -0.037280
  }
}];



mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Place.create(placeData))
  .then(places => console.log(`${places.length} places created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
