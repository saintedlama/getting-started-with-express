var path = require('path');
var express = require('express');
var router = express.Router();
var multer  = require('multer');
var memeStore = require('../lib/meme-store');





// Image upload!
router.use(multer({ dest: 'public/uploads/'}));





// Render all memes
router.get('/', function(req, res, next) {
    memeStore.find({}, function(err, memes) {
        if (err) {
            return next(err);
        }

        res.render('memes/index', { title: 'Your memes', memes : memes });
    });
});







router.get('/create', function(req, res) {
    res.render('memes/create', { title: 'Create your meme' });
});





router.post('/create', function(req, res, next) {
    var memeToCreate = {
        title : req.body.title,
        image : '/uploads/' + req.files.image.name
    };

    memeStore.insert(memeToCreate, function(err) {
        if (err) {
            return next(err);
        }

        res.redirect('..');
    });
});









router.get('/delete/:id', function(req, res, next) {
    memeStore.get(req.params.id, function(err, meme) {
        if (err) {
            return next(err);
        }

        if (!meme) {
            return next();
        }

        res.render('memes/delete', { title: 'Meme detail', meme : meme });
    });
});





router.post('/delete/:id', function(req, res, next) {
    memeStore.remove(req.params.id, function(err) {
        if (err) {
            return next(err);
        }

       res.redirect('/memes');
    });
});

router.get('/:id', function(req, res, next) {
    memeStore.get(req.params.id, function(err, meme) {
        if (err) {
            return next(err);
        }

        if (!meme) {
            return next();
        }

        res.render('memes/detail', { title: 'Meme detail', meme : meme });
    });

});




module.exports = router;