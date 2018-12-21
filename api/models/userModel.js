var mangoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  active: {
    type: Boolean, 
    default: true
    },
    authToken: {
      type: String
    },
    userFirstName: {
      type: String,
      require: true
    },
    userLastName: {
      type: String,
      require: true
    },
    userPhoneNumber: {
      type: String, 
      require: true
    },
    userEmailId: {
      type: String,
      require: true
    },
    userPassword: {
      type: String,require: true
    },
    passwordSessionId: {
      type: String,
      default: null
    },
    userGender: {
      type: String
    },
    userOwnerName: {
      type: String
    },
    userDateOfBirth: {
      type: String
    },
    userLandNameTitle: {
      type: String
    },
    userState: {
      type: String
    },
    userCity: {
      type: String
    }, 
    userDistrict: {
      type: String
    }, 
    userCountry: {
      type: String
    }, 
    userNocPolice: {
      type: String
    }, 
    userPurchaseDate: {
      type: String
    }, 
    userPriceDuringPurchase: {
      type: String
    }, 
    userAreaLandSoil: {
      type: String
    }, 
    userCurrentUse: {
      type: String
    },     
    userLoanPosession: {
      type: Boolean
    }, 
    userDocumentOfLand: {
      type: String
    },
    userLonePriceTaken: {
      type: String
    },
    userType: {
      type: String,
      enum: ['ADMIN', 'USER' ,'AUTHORIZEDUSER'],
      default: 'USER'
    }
  }
);

/*generating a hash*/
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/*checking if password is valid*/
userSchema.methods.validPassword = function(password) {
    if(this.userPassword == password) {
      return true;
    }
    else {

      return false;
    }
};

var User = mongoose.model('User', userSchema);

module.exports = {
  User: User
} 

