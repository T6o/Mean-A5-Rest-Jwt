'use strict';

var mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

var GoogleSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  idProfile:{
    type: String,
    unique:true
  },
  created: {
    type: Date,
    default: Date.now
  }

});

mongoose.model('Google', GoogleSchema);
