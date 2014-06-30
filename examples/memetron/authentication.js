var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var userStore = require('./lib/user-store');

module.exports = {
    configure : function(app) {
        app.use(passport.initialize());
        app.use(passport.session());

        configureLocalStrategy(passport);

        passport.serializeUser(function(user, done) {
            done(null, user.username);
        });

        passport.deserializeUser(function(id, done) {
            userStore.findByUsername(id, done);
        });
    },

    register : function(username, password, done) {
        userStore.findByUsername(username, function(err, user) {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(new Error('User with username already exists'));
            }

            userStore.insert({ username : username, password : password }, done);
        });
    }
};


function configureLocalStrategy(passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            userStore.findByUsername(username, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (user.password !== password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
        }
    ));
}
