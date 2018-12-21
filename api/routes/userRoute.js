'use strict'


module.exports = function(app)
{
	var userLoginController = require('../controllers/userControllers/userLoginController');
	var addUserController = require('../controllers/userControllers/addUserController');
	var getUserController = require('../controllers/userControllers/getUserController');
	var landInformationController = require('../controllers/userControllers/landInformationController');

/*--------------------------------------Login Controller Route-----------------------------------------------*/

 app.route('/user/login')
    .post(userLoginController.userLogin);
 app.route('/user/logout')
    .get(userLoginController.userLogout);



/*---------------------------------------Add Data Controller--------------------------------------------------*/
app.route('/user/adduser')
    .post(addUserController.addUser);

/*----------------------------------------get data controller-------------------------------------------------*/

app.route('/user/userinfo')
    .get(getUserController.userInfo);

app.route('/user/userlist')
    .get(getUserController.userList);

/*---------------------------------------Add land Information------------------------------------------------*/
app.route('/user/landinformation')
	.post(landInformationController.landInformation);

/*----------------------------------------get data controller-------------------------------------------------*/



}