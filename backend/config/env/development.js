// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {

	db: 'mongodb://localhost/myprog-developmen',

	sessionSecret: 'developmentSessionSecret',
	expiresIn:'15m',
	sendgrid:'',

	facebook: {
		clientID: '2006278406275141',
		clientSecret: 'ed38f71e65776472bcbe7719b1892113',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
		//callbackURL: 'http://localhost:3000/'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: '324025580906-5cmgkl1ea2gk1hf6gjdg9ng4bps0oerg.apps.googleusercontent.com',
		clientSecret: '9nYDA5HFgWXWfPMdIoNLNKL3',
		callbackURL: 'http://localhost:4200/oauth/google/callback'
	}

};
