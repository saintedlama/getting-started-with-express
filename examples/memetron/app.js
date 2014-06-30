var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session'); // Added to make passport run!

var bodyParser = require('body-parser');
var authentication = require('./authentication');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret : 'asdasdasdasdiu324kj54asjasdkj0u13lndaskj' })); // Added to make passport run!
app.use(express.static(path.join(__dirname, 'public')));

// configure authentication after middleware and stuff but before our routes
authentication.configure(app);

app.use(function(req, res, next) {
    if (req.user) {
        res.locals.user = req.user;
    }

    next();
});

// Set the application title suffix
app.set('title', 'Memetron');

// Use the router!
app.use(require('./routes/index'));

// account login/logout
app.use('/account', require('./routes/account'));

// memes
app.use('/memes', require('./routes/memes'));


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
