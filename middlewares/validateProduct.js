const {validate} = require("../models/product");
// reuqiring from model
// responsible to check req body if it valid
//then move else give response from here
function validateProduct(req,res,next){
    let {error} = validate(req.body); // validating validate coming from model
    if(error)
    return res.status(400).send(error.details[0].message);
    next(); // next means which middleware is next
    // a route is also like a middleware 
    // if corrects then runs that
}
module.exports = validateProduct;
