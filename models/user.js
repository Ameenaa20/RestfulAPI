var mongoose = require("mongoose");
var bcrypt = require('bcryptjs'); // requiring package to encrypt password
const Joi = require('@hapi/joi');
var userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role:
  {
      type: String,
      default: "user"
  }

});

userSchema.methods.generateHashedPassword = async function(){
    // a model jis pey object jis pey we passing a function
    // means jo bhi user a rcoed a uss pey custom methods asaktey hain 
    // 
    let salt = await bcrypt.genSalt(10); // generate salt 
    // will create a dummy string starying point for randmization so password will be encrypted through it returns a promise
    this.password = await bcrypt.hash(this.password, salt);  // hash karke encrypted mai ayega
    // a promise so await 
}
var User = mongoose.model("User", userSchema);

// happy joi logic comes here
// validation of data
function validateUser(data){ // validing user signup
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required(),
       // min charcter 3 and max 10
       email: Joi.string().min(3).max(15).required(),
       password: Joi.string().min(3).max(10).required(),
    });
    return schema.validate(data, {abortEarly: false}); // returns obj else null
   // now all errors detailed message will be shown
   }


// happy joi logic comes here
// validation of data
function validateUserLogin(data){ // validing user login
 const schema = Joi.object({
    // min charcter 3 and max 10
    email: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(3).max(10).required(),
 });
 return schema.validate(data, {abortEarly: false}); // returns obj else null
// now all errors detailed message will be shown
}



module.exports.User= User; // exporting
module.exports.validate = validateUser; // for signup
module.exports.validateUserLogin = validateUserLogin;  // for login
// adv mongodb pey applying querires get easier