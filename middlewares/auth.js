
const jwt = require("jsonwebtoken");
const config = require("config"); // decoding the key
const {User} = require("../models/user") // call users from model
 async function auth(req,res,next){
   let token = req.header("x-auth-token");
   // yeh fetch kargea x-auth-token ko kya req ke sath token exist or not ka check
   if(!token) return  res.status(400).send("token not provided");
 // if token  then didplay products
 // if token don't exist then error
 try{
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    // it verifies token 
    // jwtprovatekey is used to decode
    req.user = await User.findById(user._id); // on req  user embed user's data 
    // agar embed kiya then means token successfully genrted 
    //
 } catch(err){ // means error
     return res.status(401).send("invalid token");
 }
    next();
}
module.exports = auth;
// token based authentication
// auth only admin can update
// only logged in user can access it