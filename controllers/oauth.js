const rp = require('request-promise');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');





function facebook(req, res, next) {

  rp({
    method: 'POST',
    url: 'https://graph.facebook.com/v2.10/oauth/access_token',
    qs: {
      client_id: process.env.FACEBOOK_CLIENT_ID,
      client_secret: process.env.FACEBOOK_CLIENT_SECRET,
      code: req.body.code,
      redirect_uri: req.body.redirectUri
    },
    json: true
  })
    .then(token => {
      return rp({
        method: 'GET',
        url: 'https://graph.facebook.com/v2.5/me?fields=id,email,name,picture',
        qs: token,
        json: true
      });

    })
    .then(profile => {




      return User.findOne({ $or: [{ facebookId: profile.facebookId }, { email: profile.email }] })
        .then(user => {
          console.log(profile);
          // if there's no user, create one
          if(!user) {
            user = new User({
              username: profile.name
            });
          }
          // set the githubId and email (if avalible) for the user
          user.image = profile.picture.data.url;
          user.facebookId = profile.id;
          if(profile.email) user.email = profile.email;

          //save the user
          return user.save((err) => console.log(err));
        });
    })
    .then(user => {
      // create a JWT token
      const payload = { userId: user.id };
      const token = jwt.sign(payload, secret, { expiresIn: '1hr'});

      //send to a client
      res.json({ token, message: `Welcome${user.name}`});
    })
    .catch(next);








}
module.exports = {

  facebook
};
