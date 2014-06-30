module.exports = {
  display : function(req, res) {
      res.render('03_postdata', { q :  req.query.q });
  },

  save : function(req, res) {
      // Got some name?
      res.render('03_postdata', { name : req.body.name});
  }
};