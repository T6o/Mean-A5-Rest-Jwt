'use strict';

var User = require('mongoose').model('User'),
  Profile = require('mongoose').model('Profile'),
  Google = require('mongoose').model('Google'),
  Facebook = require('mongoose').model('Facebook'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  config = require('../../config/config'),
  mail = require('./mail.server.controller.js'),
  http = require('https');

exports.getProfile = function(req, res, next) {
  Profile.findOne({
    email: req.body.email
  }, function(err, user) {
    if (user) {
      console.log(user);
      res.json({
        success: true,
        message: 'Authentication failed. User not found.',
        user: user
      });
    } else {
      res.json({
        success: false,
        message: 'error'
      });
    }
  });
}

exports.signin = function(req, res, next) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else {
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
          var token = createToken(user.toJSON().email);
          res.json({
            success: true,
            token: token
          });
        } else {
          res.send({
            success: false,
            message: 'Authentication failed. Passwords did not match.'
          });
        }
      });
    }
  });
}

var createToken = function(email) {
  return jwt.sign({
    data: email
  }, config.sessionSecret, {
    expiresIn: config.expiresIn
  });
}

exports.socialToken = function(req, res, next) {
  var idToken = req.headers.authorization;
  var req = http.get('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + idToken, function(resp) {
    var response = '';
    resp.on('data', (chunk) => {
      response += chunk;
    });
    resp.on('end', () => {

      let data = JSON.parse(response);
      let email = JSON.parse(response).email;

      // 1) cerca token se esiste nella tabella google  se esiste invia token jwt a client
      findGoogleUser(email,
        function(err, profile) {
          if (err) {
            //console.log(err);
            console.log("error");
          } else {
            console.log("cerca token se esiste nella tabella google  se esiste invia token jwt a client")
            if (profile[0] != null) {
              console.log(profile[0]);
              var token = createToken(email);
              res.json({
                success: true,
                token: token,
                email: email
              });
            } else {

              // 2) cerca se mail esiste nella tabella Profile
              findProfile(email,
                function(err, profile) {
                  if (err) {
                    console.log(err);
                  } else {
                    // 3) se esiste inserisci record nella tabella google con id profile
                    if (profile[0] != null) {
                      console.log("se esiste inserisci record nella tabella google con id profile");
                      var idProfile = JSON.stringify(profile[0]._id);
                      console.log(idProfile);
                      var newGoogleUser = new Google({
                        firstName: data.given_name,
                        lastName: data.family_name,
                        email: data.email,
                        idProfile: idProfile
                      });

                      insertUser(newGoogleUser, function(err, user) {
                        if (user != null) {
                          var jwttoken = createToken(data.email);
                          res.json({
                            success: true,
                            message: 'Successfully created new user.',
                            token: jwttoken
                          });
                        } else {
                          //console.log(err);
                          return res.json({
                            success: false,
                            message: 'Registration error'
                          });
                        }
                      });

                    } else {
                      // 4) se non esite inserisci record nella tabella google e nella tabella profile
                      console.log("se non esite inserisci record nella tabella google e nella tabella profile");
                      var profile = new Profile({
                        firstName: data.given_name,
                        lastName: data.family_name,
                        email: data.email,
                      });
                      var idProfile = insertProfile(profile);
                      console.log("idProfile = ", idProfile);
                      var newGoogleUser = new Google({
                        firstName: data.given_name,
                        lastName: data.family_name,
                        email: data.email,
                        idToken: idToken,
                        idProfile: profile._id
                      });
                      if (idProfile != null) {
                        insertUser(newGoogleUser, function(err, user) {
                          if (user != null) {
                            console.log(user);
                            var token = createToken(user.email);
                            res.json({
                              success: true,
                              message: 'Successfully created new user.',
                              token: token
                            });
                          } else {
                            console.log(err);
                            return res.json({
                              success: false,
                              message: 'Registration error'
                            });
                          }
                        });
                      }
                    }
                  }
                });
            }
          }
        });
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

exports.socialTokenFacebook = function(req, res, next) {
  var idToken = req.headers.authorization;
  var req = http.get('https://graph.facebook.com/me?access_token=' + idToken + '&fields=id,name,first_name,last_name,email', function(resp) {
    var response = '';
    resp.on('data', (chunk) => {
      response += chunk;
    });
    resp.on('end', () => {

      let data = JSON.parse(response);
      let email = JSON.parse(response).email;
      email = "t6org.mrc@gmail.com";

      findFacebookUser(email,
        function(err, profile) {
          if (err) {
            //console.log(err);
            console.log("error");
          } else {
            console.log("cerca token se esiste nella tabella facebook  se esiste invia token jwt a client")
            if (profile[0] != null) {
              console.log(profile[0]);
              var token = createToken(email);
              res.json({
                success: true,
                token: token,
                email: email
              });
            } else {
              // 2) cerca se mail esiste nella tabella Profile
              findProfile(email,
                function(err, profile) {
                  if (err) {
                    console.log(err);
                  } else {
                    // 3) se esiste inserisci record nella tabella facebook con id profile
                    if (profile[0] != null) {
                      console.log("se esiste inserisci record nella tabella google con id profile");
                      var idProfile = JSON.stringify(profile[0]._id);
                      console.log(idProfile);

                      var newFacebookUser = new Facebook({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        idProfile: idProfile
                      });

                      insertUser(newFacebookUser, function(err, user) {
                        if (user != null) {
                          var jwttoken = createToken(data.email);
                          res.json({
                            success: true,
                            message: 'Successfully created new user.',
                            token: jwttoken
                          });
                        } else {
                          //console.log(err);
                          return res.json({
                            success: false,
                            message: 'Registration error'
                          });
                        }
                      });

                    } else {
                      // 4) se non esite inserisci record nella tabella facebook e nella tabella profile
                      console.log("se non esite inserisci record nella tabella google e nella tabella profile");
                      var profile = new Profile({
                        firstName: data.given_name,
                        lastName: data.family_name,
                        email: data.email,
                      });
                      var idProfile = insertProfile(profile);
                      console.log("idProfile = ", idProfile);

                      var newFacebookUser = new Facebook({
                        firstName: data.first_name,
                        lastName: data.last_name,
                        email: data.email,
                        idToken: idToken,
                        idProfile: idProfile
                      });

                      if (idProfile != null) {
                        insertUser(newFacebookUser, function(err, user) {
                          if (user != null) {
                            console.log(user);
                            var token = createToken(user.email);
                            res.json({
                              success: true,
                              message: 'Successfully created new user.',
                              token: token
                            });
                          } else {
                            console.log(err);
                            return res.json({
                              success: false,
                              message: 'Registration error'
                            });
                          }
                        });
                      }
                    }
                  }
                });
            }
          }
        });
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

exports.verify = function(req, res, next) {
  console.log("body :" + req.body.id);
  console.log("body :" + req.body.token);

  if (!req.body.id || !req.body.token) {
    res.json({
      success: false,
      message: ''
    });
  } else {
    try {
      var decoded = jwt.verify(req.body.token, config.sessionSecret);
      console.log(decoded);

      User.findOne({
        '_id': req.body.id
      }, 'email', function(err, user) {
        if (err) {
          res.status(500).send(err);
        } else {
          user.verified = true;
          user.save((err, user) => {
            if (err) {
              res.status(500).send(err)
            }
            var token = createToken(user.toJSON().email);
            res.json({
              success: true,
              token: token,
              email: user.email
            });
          });
        }
      });
    } catch (err) {
      console.log("not decoded");
      res.send({
        success: false,
        message: 'link scaduto'
      });
    }
  }
}

exports.forgotpw = function(req, res, next) {
  User.findOne({
    'email': req.body.email
  }, '_id', function(err, user) {
    if (err) {
      res.json({
        success: false,
        message: 'email not found'
      });
    } else {
      if (user != null) {
        console.log(user._id);
        var token = createToken(req.body.email);
        mail.sendMailReset(req.body.email, "resetpw", "Ripristino password", user._id, token, res);
      } else {

      }
    }
  });

  res.json({
    success: true,
    message: 'Successfully send'
  });

}

exports.resetpw = function(req, res, next) {
  if (req.body.password != null) {

    console.log(req.body);

    try {
      var decoded = jwt.verify(req.body.token, config.sessionSecret);
      console.log(decoded);

      User.findById(req.body.id, (err, user) => {
        if (err) {
          res.status(500).send(err);
        } else {
          user.password = req.body.password;
          user.save((err, user) => {
            if (err) {
              res.status(500).send(err)
            }
            var token = createToken(user.toJSON().email);
            res.json({
              success: true,
              token: token
            });
          });
        }
      });
    } catch (err) {
      console.log("not decoded");
      res.send({
        success: false,
        message: 'link scaduto'
      });
    }
  }

}

var insertUser = function(user, callback) {
  //  console.log(user);
  user.save(function(err, u) {
    if (err) {
      callback(err, null);
      console.log(err);
    } else {
      if (u == null)
        callback(err, null);
      callback(null, u);
    }
  });
}

var findGoogleUser = function(email, callback) {
  var q = Google.find({
    'email': email
  }, function(err, gp) {
    if (err) {
      callback(err, null);
    } else {
      if (gp == null)
        callback(err, null)
      callback(null, gp);
    }
  });
}

var findFacebookUser = function(email, callback) {
  var q = Facebook.find({
    'email': email
  }, function(err, gp) {
    if (err) {
      callback(err, null);
    } else {
      if (gp == null)
        callback(err, null)
      callback(null, gp);
    }
  });
}

var findProfile = function(email, callback) {
  var q = Profile.find({
    'email': email
  }, function(err, profile) {
    if (err) {
      callback(err, null);
    } else {
      if (profile == null)
        callback(err, null)
      callback(null, profile);
    }
  });
}

var findUser = function(email, callback) {
  var q = User.find({
    'email': email
  }, function(err, user) {
    if (err) {
      callback(err, null);
    } else {
      if (user == null)
        callback(err, null)
      callback(null, user);
    }
  });
}

var insertProfile = function(profile) {
  profile.save(function(err, profile) {
    if (err) {
      console.log(err);
      return null;
    }
  });
  return profile._id;
}

exports.signup = function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      message: 'Please enter email and password.'
    });
  } else {
    findProfile(req.body.email,
      function(err, profile) {
        if (err) {
          console.log(err);
        } else {
          //  console.log(JSON.stringify(profile[0]._id));
          if (profile[0] != null) {

            var idProfile = JSON.stringify(profile[0]._id);

            var newUser = new User({
              email: req.body.email,
              password: req.body.password,
              idProfile: idProfile,
            });

            insertUser(newUser, function(err, user) {
              if (user != null) {
                var token = createToken(req.body.email);
                mail.sendMail(req.body.email, "registrazione", "grazie per la registrazione", user._id, token, res);
                res.json({
                  success: true,
                  message: 'Successfully created new user.'
                });
              } else {

                findUser(req.body.email, function(err, user) {
                  if (err) {
                    return res.json({
                      success: false,
                      message: 'Registration error'
                    });
                  } else {
                    console.log(user[0]._id);
                    if (!user.verified) {
                      var token = createToken(req.body.email);
                      mail.sendMail(req.body.email, "registrazione", "grazie per la registrazione", user[0]._id, token, res);
                      return res.json({
                        success: false,
                        message: 'account exists but not verified .... look at your email ' + req.body.email
                      });
                    }
                  }
                });
              }
            });
          } else { // se non c'e' nessun profilo associato con la mail

            var profile = new Profile({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              password: req.body.password,
              idProfile: idProfile,
            });

            var idProfile = insertProfile(profile);

            var newUser = new User({
              email: req.body.email,
              password: req.body.password,
              idProfile: idProfile,
            });

            var user = insertUser(newUser, function(error, user) {
              if (user != null) {
                var token = createToken(req.body.email);
                mail.sendMail(req.body.email, "registrazione", "grazie per la registrazione", user._id, token, res);
                return res.json({
                  success: true,
                  message: 'Successfully created new user.'
                });
              } else {
                console.log("user = null")
                return res.json({
                  success: false,
                  message: 'Registration error'
                });
              }
            });
          }
        }
      });
  }
};

exports.updateProfile = function(req, res) {

  var profile = req.body;

  console.log(profile);

  Profile.findById(profile._id, function(err, p) {
    if (err) return handleError(err);

    p.firstName = req.body.firstName;
    p.lastName = req.body.lastName;
    p.email = req.body.email;
    p.birthDay = req.body.birthDay;
    p.phone = req.body.phone;
    p.city = req.body.city;

    p.traveler = req.body.traveler;
    p.expert = req.body.expert;

    p.english = req.body.english;
    p.french = req.body.french;
    p.german = req.body.german;
    p.spanish = req.body.spanish;
    p.italian = req.body.italian;

    p.description = req.body.description;

    if (req.body.birthDay != null)
      p.birthDay = req.body.birthDay.jsdate;

    console.log(p.role);

    p.save(function(err, pr) {
      if (err) console.log(err);
    });
  });

}

exports.signout = function(req, res) {
  req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });
};

exports.requiresLogin = function(req, res, next) {

  console.log(req.headers.authorization);
  var auth = JSON.parse(req.headers.authorization);
  console.log(auth.token);

  try {
    var decoded = jwt.verify(auth.token, config.sessionSecret);
    console.log(decoded);
  } catch (err) {
    console.log("not decoded");
    res.status(401).send({
      success: false,
      message: 'User is not logged in'
    });
  }
  next();
};
