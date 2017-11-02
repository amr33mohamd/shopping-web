require('./core/index');
sql = require('./core/models/sql');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
passport = require('passport');
var flash    = require('connect-flash');

require('./config/passport'); // pass passport for configuration

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());


// required for passport
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//var passportRoutes = require('./routes/passportRoutes.js')(app, passport);
var router = require('./routes');

//app.use(passportRoutes);
app.use(router);
