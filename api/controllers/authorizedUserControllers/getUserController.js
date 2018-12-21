'use strict'

/*------------------------------------Define Models and config file----------------------------*/

var User = require('../../models/userModel').User;
var AuthorizedUser = require('../../models/authorizedUserModel').AuthorizedUser;

/*-----------------user info by Id-------------*/

exports.userInfo = function(request,response){
 var userId = mongoose.Types.ObjectId(request.query.userId);
  User.findById(userId)
  .exec(function(err, userDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Internal server error.'
          }
        );
      }
      else 
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: "UserInfo is retrived",
            data: {
              userInfo: userDetails,
              userFirstName: request.userFirstName
            }
          }
        );
      }
    }
  );
}
exports.authorizedUserinfo = function(request,response){
 var authorizedUserId = mongoose.Types.ObjectId(request.query.authorizedUserId);
  AuthorizedUser.findById(authorizedUserId)
  .exec(function(err, authorizedUserDetails)
    {
      if(err)
      {
        console.log(err);
        response.statusCode = 500;
        return response.send(
          {
            status: 'FAILURE',
            message: 'Internal server error.'
          }
        );
      }
      else 
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: "AuthorizedUserInfo is retrived",
            data: {
              authorizedinfo: authorizedUserDetails
            }
          }
        );
      }
    }
  );
}
