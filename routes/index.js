var express                = require('express');
var router				   = express.Router();
var	User 			  	   = require('../models/user');
var passport 			   = require("passport");
//==============================================ROUTES===========================================================

// ROOT ROUTE
router.get("/",function (req, res) {
	res.render("landing");		
});

 //==================================
 //AUTH ROUTES
 //================================== 
 

//Sign Up form route
router.get("/signup",function ( req , res) {
	 res.render("signup");
})	;
//SIGN UP LOGIC
router.post("/signup" , function(req , res){
	 var newUser = new User({ username : req.body.username});
	 User.register(newUser , req.body.password, function(err , user){
	 	if (err) {
	 		req.flash("error",err.message);
	 		return res.redirect("/signup");
	 	}
	 	passport.authenticate("local")(req , res , function( ) {
	 		req.flash("success",("Hi , "+req.body.username+". Vizag-Tourism welcomes you"));
	 		res.redirect("/visitingplaces"); 
	 	});
	 });
});

//Login form route
router.get("/login" , function( req , res ) {
	 res.render("login" );
});
//LOGIN LOGIC
router.post("/login", passport.authenticate("local",
	{	
		successRedirect : "/visitingplaces",
		failureRedirect : "/login",
		successFlash : "Hi Vizag-Tourism welcomes you",
		failureFlash : "invalid username or password"

			}));//, function( req , res) {
				  
			// );

//LOGOUT LOGIC
router.get("/logout" , function( req , res ) {
	 req.logout();
	 req.flash("success","YOU'VE BEEN SUCCESSFULLY LOGGED OUT !");
	 res.redirect("/visitingplaces");
});


module.exports = router;