var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	sql.select('items','type','1',function(trade){
		sql.select('items','type','2',function(pluse){
			sql.select('items','type','3',function(sale){
				res.render('index',{trade,pluse,sale,id:'no', user: req.user});
			});
		});
	});
});

router.get('/filter/:id/:cat?',function(req,res){
	var id = req.params.id;
	var cat = req.params.cat;
	if(cat != null){
		sql.dselect('items','type',id,'categories_id',cat,function(data){
			sql.select('categories','1','1',function(categories){
				res.render('filter',{data,id,categories, user: req.user});
			});
		});
	}
	else{
		sql.select('items','type',id,function(data){
			sql.select('categories','1','1',function(categories){
				res.render('filter',{data,id,categories, user: req.user});
			});
		});
	}
});

router.get('/single/:id',function(req,res){
	var id = req.params.id;
	sql.select('items','id',id,function(data){
		res.render('single',{data,id:'yes', user: req.user});
	});
});

// show the login form
router.get('/login', isAlreadyLoggedIn, function(req, res) {
	res.render('login', {user: req.user, id: 'no', login_msg: req.flash('loginMessage'), signup_msg: req.flash('signupMessage')});
});

// process the login form
router.post('/api/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
	}),
    function(req, res) {
		// remember this user
        req.session.cookie.expires = false;
    	res.redirect('/');
});

// process the signup form
router.post('/api/signup', passport.authenticate('local-signup', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash : true // allow flash messages
}));

// profile
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
router.get('/profile', isLoggedIn, function(req, res) {
	res.render('profile.ejs', {user : req.user, id: 'no'});
});

// logout
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the login page
	res.redirect('/login');
}

function isAlreadyLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (!req.isAuthenticated())
		return next();

	// if they aren't redirect them to the login page
	res.redirect('/profile');
}

module.exports = router;
