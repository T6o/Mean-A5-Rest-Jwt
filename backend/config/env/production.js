// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'production' environment configuration object
module.exports = {
	//db: 'mongodb://localhost/myprog-production',

	db : '',

	sessionSecret: 'productionSessionSecret',
	expiresIn:'15m',
	sendgrid:'',

	facebook: {
		clientID: 'Facebook Application ID',
		clientSecret: 'Facebook Application Secret',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:4200/oauth/google/callback'
	}
};
