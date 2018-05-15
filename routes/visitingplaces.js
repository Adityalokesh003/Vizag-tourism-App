var express                = require('express');
var router				   = express.Router();
var VPlace 				   = require('../models/visitingplace');
var middleware			   = require('../middleware');

//INDEX - show all visiting  places
router.get("/",function(req,res) {

	VPlace.find({},
		function  ( err , visitingplaces) {
	 		if(err){
	 			req.flash("error", "Visiting place not found");
	 			res.redirect("back");

			 }else{

	 			res.render("visitingplaces/index",{visitingplaces : visitingplaces });
	 	 
	 		}
	});

});

	  
//NEW - show form to add new visiting place
router.get("/new",middleware.isLoggedIn,function ( req,res) {
	 res.render("visitingplaces/new");	
});

 
// CREATE  - add new visiting places to database
router.post("/",middleware.isLoggedIn,function ( req , res) {
	var name		 = req.body.name;
	var image		 = req.body.image;
	var description  = req.body.description;
	var author 		 = {
		id 			: req.user._id,
		username	: req.user.username
	}
	var visitingplace = {name: name , image : image, description : description , author : author};
	//adding collection from form
	VPlace.create(visitingplace,
		function( err , newlyCreatedPlace) {
			if(err){
				req.flash("error", "Something went wrong!");
				res.redirect("back");
			}else{
				req.flash("success", "visiting place is successfully added to Vizag-Tourism!");
				res.redirect("/visitingplaces");
			}
	});
  	
});




// SHOW - show particular vising places with all details
router.get("/:id",function( req , res) {
	VPlace.findById(req.params.id).populate("comments").exec(function ( err, foundPlace) {
			if ( err) {
				req.flash("error", "Something went wrong!");
				res.redirect("back");

			}else{
				 
				res.render("visitingplaces/show" ,{ visitingplace : foundPlace});	 
			}
 		});
 	
});


//EDIT ROUTE
router.get("/:id/edit",middleware.checkVisitingplaceOwnership, function( req , res) {
	VPlace.findById(req.params.id, function( err , foundPlace) {
		 if (err) {
		 	 req.flash("error", "Visiting place not found");
		 	 res.redirect("back");
		 }else{
		 	res.render("visitingplaces/edit",{visitingplace : foundPlace});
		 }
	});
	 
});

//UPDATE ROUTE
router.put("/:id",middleware.checkVisitingplaceOwnership, function( req ,res) {
	 VPlace.findByIdAndUpdate(req.params.id , req.body.visitingplace, function( err , updatedPlace) {
	 	 if (err) {
	 	 	req.flash("error", "Something went wrong!");
			res.redirect("back");
	 	 }else{
	 	 	req.flash("success", "visiting place Updated successfully!");
				 
	 	 	res.redirect("/visitingplaces/"+req.params.id);
	 	 }
	 });
});

//DESTROY ROUTE
router.delete("/:id" ,middleware.checkVisitingplaceOwnership, function( req , res ) {
	 VPlace.findByIdAndRemove(req.params.id, function( err ) {
	 	 if (err) {
	 	 	req.flash("error", "Something went wrong!");
			res.redirect("back");
	 	 }else{
	 	 	req.flash("success", "visiting place deleted successfully!");
	 	 	res.redirect("/visitingplaces");
	 	 }
	 });
});





 
module.exports = router;