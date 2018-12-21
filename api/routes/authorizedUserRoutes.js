'use strict'


module.exports = function(app)
{
	var getUserController = require('../controllers/authorizedUserControllers/getUserController');
	var postUserController = require('../controllers/authorizedUserControllers/postUserController');




/*-------------get data controller----------------------*/
 app.route('/authorizeduser/userinfo')
    .get(getUserController.userInfo);
 app.route('/authorizeduser/authorizeduserinfo')
    .get(getUserController.authorizedUserinfo);

/*--------------post data controller-------------------------*/
	
app.route('/authorizeduser/addauthorizeduser')
    .post(postUserController.addAuthorizedUser);




}

