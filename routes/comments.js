var express                = require('express');
var router				   = express.Router({mergeParams : true});
var Comment 			   = require('../models/comment');
var VPlace 				   = require('../models/visitingplace');
var middleware			   = require('../middleware');

//===================================
// COMMENT ROUTES
//===================================

// NEW comment
router.get("/new",middleware.isLoggedIn, function  ( req , res) {
	VPlace.findById(req.params.id, function ( err , visitingplace) {
		 if (err) {
		 	req.flash("error", "Something went wrong!");
			res.redirect("back");

		 }else{
		 	res.render("comments/new",{visitingplace : visitingplace}); 
		 }
	});
		  
});

//CREATE comment

router.post("/" ,middleware.isLoggedIn, function ( req , res ) {
	 VPlace.findById(req.params.id , function ( err , visitingplace) {
	 	 if ( err) {
	 	 	res.redirect("/visitingplaces");
	 	 }else{
	 	 	Comment.create(req.body.comment , function( err , comment) {
	 	 		if (err) {
	 	 			req.flash("error", "Something went wrong!");
	 	 			res.redirect("back");
	 	 		}else{
	 	 			// add username and id to comment
	 	 			comment.author.id = req.user._id;
	 	 			comment.author.username=req.user.username;
	 	 			//save comment
	 	 			comment.save();
	 	 			visitingplace.comments.push(comment);
		 	 		visitingplace.save();
		 	 		req.flash("success", "Comment is successfully posted to Vizag-Tourism!");
		 	 		res.redirect("/visitingplaces/"+visitingplace._id); 
	 	 		}
 	 	 		
	 	 	});
	 	 }
	 });
});


//COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function( req , res) {
	   
	 Comment.findById(req.params.comment_id, function( err , foundComment){
	 	 if (err) {
	 	 	req.flash("error", "Something went wrong!");
	 	 	res.redirect("back");

	 	 }else{
	 	 	res.render("comments/edit",{ visitingplace_id : req.params.id , comment : foundComment});
	 	 }
	 });

//COMMENT UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOwnership,function( req , res) {
	 Comment.findByIdAndUpdate(req.params.comment_id ,req.body.comment , function ( err , updatedComment) {
	 	if (err) {
	 		req.flash("error", "Something went wrong!");
	 		res.redirect("back");
	 	}else{
	 		req.flash("success", "Comment Updated successfully!");
	 		res.redirect("/visitingplaces/"+req.params.id);
	 	}
	 });
});

});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwnership, function( req , res) {
	 Comment.findByIdAndRemove(req.params.comment_id , function( err ) {
	 	 if (err) { 
	 	 	req.flash("error", "Something went wrong!");
	 	 	res.redirect("back");
	 	 }else{
	 	 	req.flash("success", "Comment deleted successfully!");
	 	 	res.redirect("/visitingplaces/"+req.params.id);
	 	 }
	 });
});
 

// Middleware whether valid user or not



module.exports  = router;