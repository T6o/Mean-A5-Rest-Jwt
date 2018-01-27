// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config'),
	mongoose = require('mongoose');

	const options = {
	  useMongoClient: true,
	  autoIndex: false, // Don't build indexes
	  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
	  reconnectInterval: 500, // Reconnect every 500ms
	  poolSize: 10, // Maintain up to 10 socket connections
	  bufferMaxEntries: 0
	};

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(config.db, options);

	// Load the application models
	require('../app/models/user.server.model');
	require('../app/models/profile.server.model');
	require('../app/models/google.server.model');
	require('../app/models/facebook.server.model');

	// Return the Mongoose connection instance
	return db;

};
