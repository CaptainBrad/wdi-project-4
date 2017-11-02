/* global api, describe, it, expect, beforeEach, afterEach */
require('../helper');

const Place = require('../../../models/place');
const placeData = [{
  name: 'Mongolian Beef',
  subtitle: 'beef.jpg',
  image: 'Dinner'
  //update this 

}];

describe('GET /api/places', () => {

  beforeEach(done => {
    Place.create(placeData, done);
  });

  afterEach(done => {
    Place.remove(done);
  });

  it('should return a 200 response', done => {
    api
      .get('/api/places')
      .set('Accept', 'application/json')
      .expect(200, done);
  });

  it('should return an array', done => {
    api
      .get('/api/places')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .get('/api/places')
      .set('Accept', 'application/json')
      .end((err, res) => {
        const placeItem = res.body[0];
        expect(placeItem.id).to.be.a('string');
        expect(placeItem.title).to.equal(placeData[0].title);
        expect(placeItem.image).to.equal(placeData[0].image);
        expect(placeItem.category).to.equal(placeData[0].category);
        done();
      });
  });
});
