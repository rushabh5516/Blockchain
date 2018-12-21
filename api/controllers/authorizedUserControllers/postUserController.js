'use strict'

/*------------------------------------Define Models and config file----------------------------*/

var AuthorizedUser = require('../../models/authorizedUserModel').AuthorizedUser;


/*-------------------------------------User APIs-----------------------------------------------*/
exports.addAuthorizedUser = function(request, response){
  if(typeof request.query.authorizedUserName == 'undefined' || request.query.authorizedUserName == null ||
    typeof request.query.authorizedUserDepartmentType == 'undefined' || request.query.authorizedUserDepartmentType == null ||
    typeof request.query.authorizedUserEmailId == 'undefined' || request.query.authorizedUserEmailId == null ||
    typeof request.query.authorizedUserPassword == 'undefined' || request.query.authorizedUserPassword == null )
  {
    response.statusCode = 400;
    return response.send(
    {
      status: 'FAILURE',
      message: 'name, type, email ,password not provided.'
    });
  }
  else
  {
    var authorizedUser = AuthorizedUser();
    authorizedUser.authorizedUserName = request.query.authorizedUserName;
    authorizedUser.authorizedUserDepartmentType = request.query.authorizedUserDepartmentType;
    authorizedUser.authorizedUserEmailId = request.query.authorizedUserEmailId;
    authorizedUser.authorizedUserPassword = request.query.authorizedUserPassword;
    authorizedUser.save(function(err, result)
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
                authorizedUserId: result.id,
                authorizedUserName: request.query.authorizedUserName,
                authorizedUserDepartmentType: request.query.authorizedUserDepartmentType
              }
            }
          );
        }
 
      }
   );
 }
}