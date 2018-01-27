'use strict';

// Load the module dependencies
var users = require('../../app/controllers/users.server.controller'),
	articles = require('../../app/controllers/mail.server.controller');

module.exports = function(app) {
    // Root routing
    var mail = require('../controllers/mail.server.controller');
    app.route('/api/mail').post(users.requiresLogin,mail.sendMail);

};
