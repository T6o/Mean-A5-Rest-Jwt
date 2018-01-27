'use strict';

var mongoose = require('mongoose').set('debug',true),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema;

var ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName:{
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"]
  },
  birthDay: {
    type: Date
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  english: {
    type: String,
    default: false
  },
  french: {
    type: String,
    default: false
  },
  german: {
    type: String,
    default: false
  },
  italian: {
    type: String,
    default: false
  },
  spanish: {
    type: String,
    default: false
  },
  traveler: {
    type: String,
    default: false
  },
  expert: {
    type: String,
    default: false
  },
  description:{
    type: String,
    max: 200
  }
});

mongoose.model('Profile', ProfileSchema);
