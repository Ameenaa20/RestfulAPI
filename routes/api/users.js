// to handle api related routes
const express = require("express");
let router = express.Router();
let { User,validate } = require("../../models/user");
var bcrypt = require('bcryptjs'); // requiring package to encrypt password
const _  = require("lodash"); // require lodash makes easy to use js
 const jwt = require("jsonwebtoken"); // for token it is jason web token
 const config = require("config");

router.get("/", async (req,res)=>{
    let users = await User.find().select("-password");
    res.send(users)
})
router.post("/register", async(req,res)=> {
    let {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email}); // finfind a recirds which email is same if that user exits then 400 req is returned
    if(user) return res.status(400).send("user with given email already exists"); // model user
    user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.generateHashedPassword(); // now this model
    await user.save(); // await becasue it returns promise
    let token  = jwt.sign(
        {_id: user._id, name: user.name, role:user.role}, 
        config.get("jwtPrivateKey") // var name jwtprivatekey picking from there in config folder
        );
        let datatoRetun = {
            name: user.name,
            email: user.email,
            token: user.token,
        };
    return res.send(datatoRetun); // only displays email and name in postman

});


router.post("/login", async(req,res)=>{ // route to login
    let user = await User.findOne({email: req.body.email}); // finfind a recirds which email is same if that user exits then 400 req is returned
    if(!user) return res.status(400).send("user not registered");
    let isValid = await bcrypt.compare(req.body.password, user.password); // to compare two pws whetether it is valid or not jo req ke body mai huga usko user ke ps sey compare
    if (!isValid) return res.status(401).send("invalid password"); // error comes if not matches
    let token = jwt.sign( // token ko sign karwayeget to fecth it use jwt.sign
          { _id: user._id, name: user.name,role: user.role}, // user ke public prpeoerties ko ess sey genrate karywagey only it can do it
        config.get("jwtPrivateKey") // var name jwtprivatekey picking from there in config folder
      // then essko privatekey bhejwaye gey
        );
    res.send(token); // if all good logged in  so token is genrated
}); // route to login
// login means in return we will get a token
module.exports = router;

// if both conditions correct given token to user like a passport (json web token)