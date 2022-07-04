var mongoose = require("mongoose");
const Joi = require('@hapi/joi');
var productSchema = mongoose.Schema({ // product schema
  name: String,
  //price: Number,
  story: String,
  

});

var Product = mongoose.model("Product", productSchema); // here model ka function from model ka naam
// happy joi logic comes here
// validation of data
function validateProduct(data){
 const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(), 
    // min charcter 3 and max 10
    //price: Joi.number().min(0).required(),
    story: Joi.string().min(10).max(1000).required(),
 
 });
 return schema.validate(data, {abortEarly: false}); // returns the obj else null
// now all errors detailed message will be shown
}



module.exports.Product= Product; // exporting the model
module.exports.validate = validateProduct; // validate ka logic now validate product has
// adv mongodb pey applying querires get easier
