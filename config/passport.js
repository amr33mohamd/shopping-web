var LocalStrategy   = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    con.query("SELECT * FROM `users` WHERE `id` = ? ", [id], function(err, rows){
        done(err, rows[0]);
    });
});

// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use(
    'local-signup',
    new LocalStrategy({
        // by default, local strategy uses email and password, we will override with email
        usernameField : 'signup_email',
        passwordField : 'signup_password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        var name = req.body.signup_name;
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        con.query("SELECT * FROM `users` WHERE `email` = ? LIMIT 1", [username], function(err, rows) {
            if (err)
                return done(err);
            if (rows.length) {
                return done(null, false, req.flash('signupMessage', 'تم تسجيل هذا الريد الالكترونى مسبقاً'));
            } else {
                // if there is no user with that email
                // create the user
                var newUserMysql = {
                    name: name,
                    username: username,
                    password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                };

                con.query("INSERT INTO `users` (`name`, `email`, `password`) values (?, ?, ?)", [newUserMysql.name, newUserMysql.username, newUserMysql.password], function(err, rows) {
                    newUserMysql.id = rows.insertId;

                    return done(null, newUserMysql);
                });
            }
        });
    })
);

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'
passport.use(
    'local-login',
    new LocalStrategy({
        // by default, local strategy uses email and password, we will override with email
        usernameField : 'login_email',
        passwordField : 'login_password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form
        con.query("SELECT * FROM `users` WHERE `email` = ? LIMIT 1", [username], function(err, rows){
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'خطاء فى البريد اللكترونى')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password))
                return done(null, false, req.flash('loginMessage', 'كلمة مرور خاطئة')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, rows[0]);
        });
    })
);
