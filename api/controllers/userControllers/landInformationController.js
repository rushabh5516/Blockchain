'use strict'

/*--------------------------------------models------------------------------------------*/

var User = require('../../models/userModel').User;


/*-------------------------add land informartion-------------------------------------*/
exports.landInformation = function(request, response){
  if(typeof request.query.userLandNameTitle == 'undefined' || request.query.userLandNameTitle == null ||
    typeof request.query.userState == 'undefined' || request.query.userState == null ||
    typeof request.query.userCity == 'undefined' || request.query.userCity == null ||
    typeof request.query.userDistrict == 'undefined' || request.query.userDistrict == null ||
    typeof request.query.userCountry == 'undefined' || request.query.userCountry == null || 
    typeof request.query.userNocPolice == 'undefined' || request.query.userNocPolice == null ||
    typeof request.query.userPurchaseDate == 'undefined' || request.query.userPurchaseDate == null ||
    typeof request.query.userPriceDuringPurchase == 'undefined' || request.query.userPriceDuringPurchase == null ||
    typeof request.query.userAreaLandSoil == 'undefined' || request.query.userAreaLandSoil == null ||
    typeof request.query.userCurrentUse == 'undefined' || request.query.userCurrentUse == null ||
    typeof request.query.userLoanPossession == 'undefined' || request.query.userLoanPossession == null ||
    typeof request.query.userLoanPriceTaken == 'undefined' || request.query.userLoanPriceTaken == null ||
    typeof request.query.userDocumentOfLand == 'undefined' || request.query.userDocumentOfLand == null)
  {
    response.statusCode = 400;
    return response.send(
    {
      status: 'FAILURE',
      message: ' areaOfLand, ownername, documentOfLand, nocPolice not provided.'
    });
  }
  else 
  {
    var user = new User();
    user.userLandNameTitle = request.query.userLandNameTitle;
    user.userState = request.query.userState;
    user.userCity= request.query.userCity;
    user.userDistrict= request.query.userDistrict;
    user.userCountry= request.query.userCountry;
    user.userNocPolice= request.query.userNocPolice;
    user.userPurchaseDate= request.query.userPurchaseDate;
    user.userPriceDuringPurchase= request.query.userPriceDuringPurchase;
    user.userAreaLandSoil= request.query.userAreaLandSoil;
    user.userCurrentUse= request.query.userCurrentUse;
    user.userLoanPossession= request.query.userLoanPossession;
    user.userLoanPriceTaken= request.query.userLoanPriceTaken;
    user.userDocumentOfLand= request.query.userDocumentOfLand;
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
            message: 'user land Information added successfully.',
            data: {
                userId: result._id              }
            }
          );
        }
    }
    );
  }
}
  