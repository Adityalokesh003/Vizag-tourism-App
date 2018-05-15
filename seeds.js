var mongoose = require("mongoose");
var VPlace   = require("./models/visitingplace");
var Comment      = require("./models/comment");

var data = [{
			name : "Simha Chalam Temple",
			image : "http://www.kostalife.com/wp-content/uploads/2015/09/simhachalam.jpg",
			description : "In 1985 Aldus Corporation launched its first desktop publishing program Aldus PageMaker for Apple Macintosh computers, released in 1987 for PCs running Windows 1.0. Both contained the variant lorem ipsum most common today. Laura Perry, then art director with Aldus, "
		} ,
		{
			name : "Snake Road",
			image : "http://travel-blog.waytoindia.com/wp-content/uploads/lakkidi.jpg",
			description : "In 1985 Aldus Corporation launched its first desktop publishing program Aldus PageMaker for Apple Macintosh computers, released in 1987 for PCs running Windows 1.0. Both contained the variant lorem ipsum most common today. Laura Perry, then art director with Aldus, "
		},
		{
			name : "Kailasa Giri",
			image : "http://1.bp.blogspot.com/-pQKk2hfq1II/T7T0XTE0fVI/AAAAAAAAAgQ/BW_FJBzlYRs/s1600/v.JPG",
			description : "In 1985 Aldus Corporation launched its first desktop publishing program Aldus PageMaker for Apple Macintosh computers, released in 1987 for PCs running Windows 1.0. Both contained the variant lorem ipsum most common today. Laura Perry, then art director with Aldus, "
		}];


function  seedDB() {
		VPlace.remove({},function  ( err ) {
			 if ( err) {
			 	console.log(err);
			 }
			 console.log("romoved");
			 data.forEach(function ( seed){
				 VPlace.create(seed, function( err , visitingplace) {
					if (err) {
						console.log(err);

					} 	else{
						console.log("added a place");
						//comment
						Comment.create(
							{
								text : "this is awesome",
								author 	: "aditya"
							},function ( err , comment) {
								if ( err) {
									console.log("error");

								}else{
								 visitingplace.comments.push(comment);
								 visitingplace.save();
								 console.log("created new comment");
								}
							});
					} //else
				 });//create v place
			});//foreach
 
});//remove


}// seed func

module.exports = seedDB;


