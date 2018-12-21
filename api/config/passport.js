'use strict';

var LocalStrategy = require('passport-local').Strategy;
 
var User = require('../../api/models/userModel').User;

module.exports = function (passport) {

  passport.serializeUser(
    function(user, done)
    {
      done(null, user.id);
    }
  );

  passport.deserializeUser(
    function(user, done) 
    {
      User.findById(user)
        .exec(function(err, user) 
        {
          done(err, user);
        }
      );
    }
  );

  passport.use(
  	'local-login',
  	new LocalStrategy(
  	{
  		usernameField: 'emailId',
  		passwordField: 'password',
  		passReqToCallback: true
  		}, 
        function(req, emailId, password, done) 
        {
          process.nextTick(
            function() 
            {
              console.log(emailId, password)
              User.findOne({userEmailId: emailId})
              .exec(function(err, user) 
              {
                console.log(user)
                if(err) 
                {
                  console.log(err);
                }
                if (!user) 
                {  
                  return done(null);
                }
                if (!user.validPassword(password)) 
                {
                  return done(null);
                }
                else
                {
                  return done(null, user);
                }
              }
            );
          }
        );
      }
    )
  );
};