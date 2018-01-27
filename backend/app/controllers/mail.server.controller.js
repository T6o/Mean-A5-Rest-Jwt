// Invoke 'strict' JavaScript mode
'use strict';
var config = require('../../config/config'),
  nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.sendgrid);

// Create a new 'render' controller method
exports.sendMail = function(req, res) {
  var data = req.body;
  console.log("mail " + req.body.email + "message " + req.body.message + "subject" + req.body.subject);
  const msg = {
    to: req.body.email,
    from: 'test@email.com',
    subject: req.body.subject,
    text: req.body.message,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail.send(msg);
  res.json(data);

};

exports.sendMail = function(email, subject, message, userId, token, res) {
  var url = 'http://localhost:4200/#/home?';
  const msg = {
    to: email,
    from: 'test@email.com',
    subject: subject,
    text: message,
    html: '<strong>conferma registrazione </strong> <a href=" ' + url + 'id=' + userId + '&t=' + token + ' "> Registrati </a>',
  };
  sgMail.send(msg);
};

exports.sendMailReset = function(email, subject, message, userId, token, res) {
  var url = 'http://localhost:4200/#/reset?';
  const msg = {
    to: email,
    from: 'test@email.com',
    subject: subject,
    text: message,
    html: '<strong>conferma registrazione </strong> <a href=" ' + url + 'id=' + userId + '&t=' + token + ' "> Resetta password </a>',
  };
  sgMail.send(msg);

};
