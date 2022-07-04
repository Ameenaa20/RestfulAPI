var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

 /*app.set("view engine", "ejs")
app .get("/upload", (req, res) => {
  res.render("uplaod");
});

app .post("/upload", upload.single("image"), (req, res) => {
  res.send("image uploaded");
}); */
 

 
//app.listen(4000);
//console.log("4001 os the port"); 



