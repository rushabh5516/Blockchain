'use strict';

/*------------------------------------Define Models and config file----------------------------*/

var User = require('../../models/userModel').User;

var admin = require("firebase-admin");

var UserFirebase = require("../../config/blockchain-c57cf-firebase-adminsdk-rl98v-8d2a45e6c3.json");

admin.initializeApp({
  credential: admin.credential.cert(UserFirebase),
  databaseURL: "https://blockchain-c57cf.firebaseio.com"
});


/*--------------------------------------User APIs-------------------------*/

exports.userLogin = function(request, response) {
    
  /*check for phoneNumber & emailId.*/

  if(typeof request.query.phoneNumber == 'undefined' || request.query.phoneNumber == null
    || typeof request.query.emailId == 'undefined' || request.query.emailId == null)
  {
    response.statusCode = 400;
    return response.send(
    {
      status: 'FAILURE',
      message: 'phoneNumber or emailId not provided.'
    });
  }
  else
  {
    User.findOne({phoneNumber: request.query.phoneNumber, active: true})
    .exec(
      function(err, userDoc)
      {
        if(userDoc == null)
        {
          /*New User*/
          var newUser = new User();
          newUser.authToken = randomstring.generate(15);
          newUser.userId = randomstring.generate(8);
          newUser.userType = request.query.userType;
          newUser.phoneNumber = request.query.phoneNumber;
          newUser.save(function(err, userResult)
            {
              if(err)
              {
                console.log(err);
                response.statusCode = 500;
                return response.send(
                  {
                    status: 'FAILURE',
                    message: 'Something went wrong.'
                  }
                );
              }
              else
              {
                var userDetails = {};
                userDetails.userId = userResult._id;
                userDetails.authToken = userResult.authToken;
                userDetails.userId = userResult.userId;
                response.statusCode = 201;
                return response.send(
                  {
                    status: 'SUCCESS',
                    message: 'New user Created.',
                    data: {
                      userDetails: userDetails
                    }
                  }
                );
              }
            }
          );
        }
        else
        {
          /*Old user*/
          /*
            update user 
            -lastLogin, authToken, updateTime, deviceType
          */
          var date = new Date();
          userDoc.authToken = randomstring.generate(15);
          userDoc.userType = request.query.userType;
          userDoc.updateTime = date;
          userDoc.lastLogin = date;
          userDoc.save(function(err, userResult)
            {
              if(err)
              {
                console.log(err);
                response.statusCode = 500;
                return response.send(
                  {
                    status: 'FAILURE',
                    message: 'Something went wrong.'
                  }
                );
              }
              else
              {
                var userDetails = {};
                userDetails.userId = userResult._id;
                userDetails.authToken = userResult.authToken;
                userDetails.userId = userResult.userId;
                response.statusCode = 200;
                return response.send(
                  {
                    status: 'SUCCESS',
                    message: 'User already exists.',
                    data: {
                      userDetails: userDetails
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
};

exports.userLogout = function(request, response) {
  var userId = mongoose.Types.ObjectId(request.query.userId)
  User.findById(userId)
  .exec(function(err, userDoc)
    {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Something went wrong.'
          }
        );
      }
      else
      {
        /*
          On user Logout out update authToken and remove firebaseToken from DB.
        */
        var date = new Date();
        userDoc.authToken = randomstring.generate(15);
        userDoc.firebaseToken = null;
        userDoc.updateTime = date;
        userDoc.save(function(err)
          {
            if(err) 
            {
              console.log(err);
              response.statusCode = 500;
              return response.send(
                {
                  status: 'FAILURE',
                  message: 'Something went wrong.'
                }
              );
            }
            else
            {
              response.statusCode = 200;
              return response.send(
                {
                  status: 'SUCCESS',
                  message: 'User logged out.'
                }
              );
            }
          }
        );
      }
    }
  );
};
