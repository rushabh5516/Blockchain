'use strict'

/*------------------------------------Define Models and config file----------------------------*/

var User = require('../../models/userModel').User;


/*--------------------user list---------------*/

exports.userList = function(request,response){
  User.find({active:true})
  .exec(function(err, userDoc) 
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
      else if(userDoc.length == 0)
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'getUserList retrive.',
            data: {
              userList: userDoc
            }
          }
        );
      }
      else
      {
        response.statusCode = 200;
        return response.send(
          {
            status: 'SUCCESS',
            message: 'getUserList retrive.',
            data: {
              userList: userDoc
            }
          }
        );
      }
    }
  );
}

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
              userInfo: userDetails
            }
          }
        );
      }
    }
  );
}
