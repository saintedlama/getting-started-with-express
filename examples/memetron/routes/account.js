var express = require('express');
var router = express.Router();
var passport = require('passport');
var authentication = require('../authentication');





router.get('/login', function(req, res) {
    res.render('account/login', { title: 'Express' });
});





router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/account/login' }));





router.get('/register', function(req, res) {
    res.render('account/register', { title: 'Express' });
});





router.post('/register', function(req, res) {
    authentication.register(req.body.username, req.body.password, function(err, user) {
        if (err) {
            return res.render('account/register', { title: 'Express', err : err });
        }

        res.redirect('/');
    });
});





router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});





module.exports = router;
