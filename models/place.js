const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const coordinateSchema = new mongoose.Schema({
  lat: Number,
  lng: Number
});

const commentSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  text: { type: String },
  rating: { type: Number }
});

commentSchema.methods.getStarIcons = function() {
  let stars = '';
  for(let i = 0; i<Math.floor(this.rating); i++) {
    stars += '<span class="star">&#128169;</span> ';
  }
  return stars;
};

const placeSchema = mongoose.Schema({
  name: { type: String, required: 'name is required' },
  subtitle: { type: String, required: 'subtitle is required' },
  // addAddress: { type: String },
  image: { type: String, required: 'Image is required' },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [ commentSchema ],
  latLng: coordinateSchema,
  budget: { type: Number  },
  review: { type: String }

  // rating: { type: String, required: 'Category is required' }
});
placeSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

placeSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

placeSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

placeSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) {
    return s3.deleteObject({ Key: this.image }, next);
  }
  next();
});

placeSchema
  .virtual('avgRating')
  .get(function getAvgRating() {
    if(this.comments.length === 0) return false;
    const total = this.comments.reduce((sum, comment) => {
      return sum + comment.rating;
    }, 0);
    const avg = total / this.comments.length;
    return Math.round(avg*2)/2;
  });

placeSchema.methods.getStarIcons = function() {
  let stars = '';
  for(let i = 0; i<Math.floor(this.avgRating); i++) {
    stars += '<span class="star">&#128169;</span> ';
  }
  if(this.avgRating % 1 > 0) stars += '<span class="star half">&#128169;</span>';
  return stars;
};



module.exports = mongoose.model('place', placeSchema);
