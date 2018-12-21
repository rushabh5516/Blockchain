'use strict'

/*------------------------------------Define Models and config file----------------------------*/

var User = require('../../models/userModel').User;


/*-------------------------------------User APIs-----------------------------------------------*/
exports.addUser = function(request, response){
  if(typeof request.query.userFirstName == 'undefined' || request.query.userFirstName == null ||
    typeof request.query.userLastName == 'undefined' || request.query.userLastName == null ||
    typeof request.query.userEmailId == 'undefined' || request.query.userEmailId == null ||
    typeof request.query.userPassword == 'undefined' || request.query.userPassword == null||
    typeof request.query.userPhoneNumber == 'undefined' || request.query.userPhoneNumber == null||
    typeof request.query.userDateOfBirth == 'undefined' || request.query.userDateOfBirth == null) 
      {
    response.statusCode = 400;
    return response.send(
    {
      status: 'FAILURE',
      message: 'firstname, lastname, gender, emailId, areaOfLand, ownername, documentOfLand, nocPolice not provided.'
    });
  }
  else 
  {
    var user = new User();
    user.userFirstName = request.query.userFirstName;
    user.userLastName = request.query.userLastName;
    user.userGender = request.query.userGender;
    user.userEmailId = request.query.userEmailId;
    user.userDateOfBirth = request.query.userDateOfBirth;
    user.save(function(err, result)
    {
      if(err)
        {
          console.log(err);
          response.statusCode = 500;
          return response.send(
            {
              status: 'FAILURE',
              message: 'Internal server error.',  
            }
          );
        }
        else
        {
          response.statusCode =201;
          return response.send(
          {
            status: 'SUCCESS',
            message: 'user added successfully.',
            data: {
                userId: result._id,
                userFirstName: result.userFirstName,
                userLastName: result.userLastName
              }
            }
          );
        }
      }
    );
  }
}
  




