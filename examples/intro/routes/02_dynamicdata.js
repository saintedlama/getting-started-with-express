module.exports = function(req, res) {
    res.render('02_dynamicdata', { date : new Date() });
};