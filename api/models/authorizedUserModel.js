var mangoose = require('mongoose');
var Schema = mongoose.Schema;

var authorizedUserSchema = new Schema({
  active: {
    type: Boolean, 
    default: true
    },
    authToken: {
      type: String
    },
    userId: {
     type: String
    },
    authorizedUserName: {
      type: String,
      require: true
    },
    authorizedUserDepartmentType: {
      type: String,
      enum: ['REGISTRAR', 'BANK', 'POLICE', 'RTO'],
      default: 'REGISTRAR'
    },
    authorizedUserEmailId: {
      type: String, 
      require: true
    },
    authorizedUserPassword: {
      type: String,
      require: true
    },
    userType: {
      type: String,
      enum: ['ADMIN', 'USER' ,'AUTHORIZEDUSER'],
      default: 'USER'
    }
  });

var AuthorizedUser = mongoose.model('AuthorizedUser', authorizedUserSchema);

module.exports = {
  AuthorizedUser: AuthorizedUser
}