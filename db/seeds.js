const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const Place      = require('../models/place');

const placeData = [{
  name: 'Hackney City Farm',
  subtitle: 'Totes free, just dont adopt an animal ',
  // addAddress: '25 Hackney East London Area',
  image: 'http://www.growingcity.co.uk/wp-content/uploads/2012/02/IMG_09001.jpg',
  budget: 0,
  review: 'Super Hipster little farm in hackney. All animals are fairly street so brush up on your rudeboy slang, yes ',
  latLng: {
    lat: 51.557240,
    lng: -0.037280
  }
}, {
  name: 'Primrose Hill',
  subtitle: 'Pretty much the same thing as the London eye',
  // addAddress: '25 Hackney East London Area',
  image: 'https://www.standard.co.uk/s3fs-public/thumbnails/image/2016/08/16/07/primrosehill.jpg',
  budget: 0,
  review: ' So you have a view of London and you can walk down to outside of london zoo and see the giraffes and African wild dogs for free, yes',
  latLng: {
    lat: 51.5384471,
    lng: -0.1725026
  }

}, {
  name: 'Dalston Roof Park',
  subtitle: 'Pretty much the same thing as the London eye',
  // addAddress: '25 Hackney East London Area',
  image: 'https://cdn.images.express.co.uk/img/dynamic/galleries/x701/61817.jpg',
  budget: 0,
  review: ' Super Hipster rooftop park, yes',
  latLng: {
    lat: 51.5316725,
    lng: -0.1725026
  }

}, {
  name: 'Southbank',
  subtitle: 'Walk along the thames and look at expensive stuff',
  // addAddress: '25 Hackney East London Area',
  image: 'https://southbanklondon.com/sites/default/files/2017-01/History%20of%20London%20South%20Bank.jpg',
  budget: 0,
  review: ' Its a great place to take someone who is not from London.',
  latLng: {
    lat: 51.4993878,
    lng: -0.1270156
  }
// }, {
}, {
  name: 'Nat Portrait Gallery',
  subtitle: 'Do not get roped into a volentary donation, you fool!',
  // addAddress: '25 Hackney East London Area',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/London_NPG.JPG/1200px-London_NPG.JPG',
  budget: 0,
  review: ' Personally, I found it super boring but it was raining outside and I looked really cultured',
  latLng: {
    lat: 51.5094236,
    lng: -0.1303103
  }
}, {
  name: 'Sky Garden',
  subtitle: 'yes',
  // addAddress: '25 Hackney East London Area',
  image: 'https://skygarden.london/sites/default/files/DSCF7684.jpg',
  budget: 0,
  review: ' Nice view but DO NOT BUY A DRINK THEY ARE LIKE £8!!!!!',
  latLng: {
    lat: 51.51128,
    lng: -0.0857557
  }
}, {
  name: 'Hyde Park',
  subtitle: 'Feed the Ducks ethical duck food',
  // addAddress: '25 Hackney East London Area',
  image: 'https://i.ytimg.com/vi/arUYNJo4hGY/maxresdefault.jpg',
  budget: 2,
  review: ' do not be a dick and feed the ducks bread, buy some ethical duck food',
  latLng: {
    lat: 51.5052504,
    lng: -0.1677802
  }
}, {
  name: 'Borough Market',
  subtitle: 'Be cheeky and eat before you go',
  // addAddress: '25 Hackney East London Area',
  image: 'https://media-cdn.tripadvisor.com/media/photo-s/01/39/50/ce/borough-market-entrance.jpg',
  budget: 5,
  review: ' Get something but share it, then eat most of it.',
  latLng: {
    lat: 51.5054872,
    lng: -0.0929221
  }
}];



mongoose.connect(dbURI, { useMongoClient: true })
  .then(db => db.dropDatabase())
  .then(() => Place.create(placeData))
  .then(places => console.log(`${places.length} places created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
