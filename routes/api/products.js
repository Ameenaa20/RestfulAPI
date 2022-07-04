const express = require("express");
//const res = require("express/lib/response");
let router = express.Router(); //create express router
const validateProduct = require("../../middlewares/validateProduct"); // a midlewre
const auth = require("../../middlewares/auth");
const admin = require("../../middlewares/admin");
var {Product} = require("../../models/product");


// get products returning an arrray
//router.get("/", async(req, res) =>{
  //  return res.send(["Pen", "Pencil"]);
//});
// get all products aarays
router.get("/", async(req, res) =>{ // becasue already router sey /api/product el request ek response
  console.log(req.user); // user info comes here
    //console.log(req.query);// fro page display it will store all var values i n one json obj suppose page 1 page 1 will come
    let page = Number(req.query.page? req.query.page : 1);  // query page fiven return it otherwise return page number 1
    let perPage = Number(req.query.perPage? req.query.perPage:10); // dfault per page is  api/products?page=1
    let skipRecords = (perPage*(page-1));  // like if page is page no 1 then skip 0 records if 2 then 2-1 *10 is 10
    let products = await Product.find().skip(skipRecords).limit(perPage); // how many records skip and how many pages are needed to be brought i.e perpage are needed to be brought
    return res.send(products); // when all good
});


// get single products will pass id parameter
router.get("/:id", async(req, res) =>{
    try{
    let product = await Product.findById(req.params.id); 
    if(!product) return res.status(400).send("Product with given is not present"); // when id is not present
    return res.send(product); // if all correct then this response
  }   catch(err){  // error on 400 gives bad req error
         return res.status(400).send("invalid ID"); // in  case wrong format of id
  }
});

// update a record
// will create a new route with put which will give us an id
// adding validtion here as well
router.put("/:id", validateProduct, auth, admin, async(req,res)=>{
  //router.put("/:id", validateProduct,  async(req,res)=>{
    let product = await Product.findById(req.params.id); 
    product.name = req.body.name; // it will take name from request body
   product.story = req.body.story; //request.body.name now we are picking names from request body
  
   await product.save();
   return res.send(product); // return updated product when all good
});


// to delete a record only admin can delete
router.delete("/:id", auth, admin, async(req, res) =>{ 
  //router.delete("/:id", async(req, res) =>{ 
    let product = await Product.findByIdAndDelete(req.params.id); 
    
    return res.send(product); // if all correct then this response

});

// insert a record only by authorized user
//router.post("/", validateProduct, auth, async(req, res) =>{
  
router.post("/", validateProduct, async(req, res) =>{
    // req will first go to validate product it will cgeck if it is valid fro
    // if valid the it will go to next
    // next means what is middleware is let product below lines/
    //routers are also like middle ware
    // code will not move till the validation is true
    let product = new Product();
    product.name = req.body.name; // it will take name from request body
    product.story = req.body.story;
    
    await product.save();
    return res.send(product); // if all correct then this response

}); 

module.exports = router;
