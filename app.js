var express          	   = require("express"),
	mongoose               = require("mongoose"),
	passport 			   = require("passport"),
	bodyParser             = require('body-parser'),
	User				   = require("./models/user"),
 	LocalStrategy          = require("passport-local"),
	passportLocalMongoose  = require("passport-local-mongoose"),
	VPlace      		   = require("./models/visitingplace"),
	Comment     		   = require("./models/comment"),
	seedDB   		       = require('./seeds'),
	flash				   = require('connect-flash');
	methodOverride		   = require('method-override');

//reruiring routes
var indexRoutes			   = require('./routes/index');
var visitingplaceRoutes	   = require('./routes/visitingplaces');
var commentRoutes		   = require('./routes/comments');

//config except passport  
mongoose.connect("mongodb://localhost/visitingplaces_v9");
//seedDB(); //seeding database
var app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.urlencoded({extended :true}));
app.use(methodOverride("_method"));
app.use(flash());
// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret : " My name is Aditya Surabattula",
	resave : false ,
	saveUninitialized : false 
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function ( req ,res ,next) {
	 res.locals.currentUser = req.user;
	 res.locals.error		= req.flash("error");
	 res.locals.success     = req.flash("success");
	 next();
});

app.use( indexRoutes);
app.use("/visitingplaces",visitingplaceRoutes);
app.use("/visitingplaces/:id/comments",commentRoutes);



//--------------------------------------------------------------------------------------------------------------

app.listen(3000,function() {
	 console.log("server has started");
});