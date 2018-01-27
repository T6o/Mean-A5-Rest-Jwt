// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
  passport = require('passport');

module.exports = function(app) {

  app.route('/signup')
    .post(users.signup);

  app.route('/signin')
    .post(users.signin);

  app.route('/forgotpw')
    .post(users.forgotpw);

  app.route('/resetpw')
    .post(users.resetpw);

  app.route('/verify')
    .post(users.verify);

  app.route('/socialToken')
    .get(users.socialToken);

  app.route('/socialTokenFacebook')
    .get(users.socialTokenFacebook);

  app.route('/profile')
    .post(users.getProfile);

  app.route('/update')
    .post(users.updateProfile);

};
