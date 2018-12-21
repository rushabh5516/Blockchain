'use strict'

/*----------------------models-----------------------*/
var User = require('../../models/userModel').User;
var AuthorizedUser = require('../../models/authorizedUserModel').AuthorizedUser;


/*--------------------dashboard apis----------------------*/
exports.dashboard = function(request, response){
  async.parallel(
    {
      userCount: function(parallelCallback) 
      {
        User.countDocuments({active: true})
        .lean()
        .exec(function(err, count)
          {
            if(err)
            {
              console.log(err);
              parallelCallback(err, null);
            }
            else
            {
              parallelCallback(null, count);
            } 
          }
        );
      },
      authorizedUserCount: function(parallelCallback) 
      {
        AuthorizedUser.countDocuments({active: true})
        .lean()
        .exec(function(err, count)
          {
            if(err)
            {
              console.log(err);
              parallelCallback(err, null);
            }
            else
            {
              parallelCallback(null, count);
            } 
          }
        );
      }
    },
    function(err, parallelResult)
    { 
      if(err)
      {
        console.log(err)
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
            message: 'Dashboard data retrieved.',
            data: {
              dashboardCount: parallelResult
            } 
          }
        );
      }
    } 
  );
};


