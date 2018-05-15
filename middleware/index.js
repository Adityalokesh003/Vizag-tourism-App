var VPlace        = require('../models/visitingplace');
var Comment 	  = require('../models/comment');

var middlewareObj ={}

middlewareObj.isLoggedIn= function isLoggedIn(req , res , next){
								if (req.isAuthenticated()) {
									return next();
								}
								req.flash("error", "YOU NEDD TO BE LOGGED IN FIRST!!");
								res.redirect("/login");
							}



middlewareObj.checkVisitingplaceOwnership =function checkVisitingplaceOwnership(req , res ,next){
												if(req.isAuthenticated()) {
													VPlace.findById(req.params.id, function( err , foundPlace) {
														 if (err) {
														 	req.flash("error" , "Visiting place not found");
														 	res.redirect("back");

														 }else{

														 	if(foundPlace.author.id.equals(req.user._id)){
														 		next();
														 	}else{
														 		req.flash("error" , "YOU DON'T HAVE PERMISSION TO DO THAT.");
											 			 		res.redirect("back");
											 			 	}

														 }
													});
												}else{
													req.flash("error","YOU NEED TO BE LOGGED IN FIRST!!");
													res.redirect("back");
												}
											}

middlewareObj.checkCommentOwnership = function (req , res ,next){
											if (req.isAuthenticated()) {
												Comment.findById(req.params.comment_id, function( err , foundComment) {
													 if (err) {
													 	req.flash("error" , " comment not found");
													 	res.redirect("back");
										 
													 }else{

													 	if(foundComment.author.id.equals(req.user._id)){
													 		next();
													 	}else{
													 		req.flash("error" , "YOU DON'T HAVE PERMISSION TO DO THAT.");
										 			 		res.redirect("back");
										 			 	}

													 }
												});
											}else{
												req.flash("error","YOU NEED TO BE LOGGED IN FIRST!!");
												res.redirect("back");
											}
										}

module.exports = middlewareObj;