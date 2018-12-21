'use strict';
/*----------------------models function and config file------------=*/

var User = require('../../models/userModel').User;

/*-------------user API-----------*/

/*-----------user logout */
exports.logout = function(request, response) {
  request.logout();
  response.statusCode = 200;
  return response.send(
    {
      status: 'SUCCESS',
      message: 'Admin logged out successfully.'
    }
  );
};

/*----------------------login failure--------------------*/
exports.failure = function(request, response) {
  response.statusCode = 400;
  return response.send(
  { 
     status: 'FALIURE',
     message: 'Email-Id or password is incorrect.'
  }
 );
}

/*-------------admin entry------------*/
exports.adminEntry = function(request,response){
  /*-----------random value of user--------------*/
  var user = new User();
  user.emailId = 'admin@blockchain.com';
  user.password = 'blockchain123';
  user.firstName = 'ADMIN';
  user.phoneNumber = '0000000000';
  user.userType = 'ADMIN';
  user.save(function(err) 
    {
      if(err) 
      {
      console.log(err);
      }
    }
  );
};

