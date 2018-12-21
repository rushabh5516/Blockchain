'use strict';
/*---------------admin controller------------*/

module.exports = function(app,passport)
{
	var adminDashboardController = require('../controllers/adminController/adminDashboardController');
	var userLoginController = require('../controllers/adminController/userLoginController');
/*------------------admin login controller---------------------------*/

  app.route('/admin/login')
    .post(passport.authenticate('local-login', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/admin/login/failure'
    }));

  app.route('/admin/login/failure')
    .get(userLoginController.failure);

  app.route('/admin/logout')
    .get(userLoginController.logout);

  app.route('/admin/entry')
    .post(userLoginController.adminEntry);
    

  /*-------------------------admin dashboard controller------------------*/  


app.route('/admin/dashboard')
    .get(adminDashboardController.dashboard);
}

/*route middleware to make sure a user is logged in*/
function isLoggedIn(request, response, next) {
  /*if user is authenticated in the session, carry on*/
  if (request.isAuthenticated()) 
  {
    return next();
  }
  else
  {
    /*if they aren't redirect them to the home page*/
    response.statusCode = 400;
    return response.send(
      {
        status: 'FAILURE',
        message: 'User not logged in'
      }
    );
  }
}

