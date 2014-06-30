var memes = [];
var memeStore = {
    get  : function(id, next) {
        for (var i=0;i<memes.length;i++) {
            if (memes[i].id === parseInt(id, 10)) {
                return next(null, memes[i]);
            }
        }

        next();
    },

    remove : function(id, next) {
        memes.splice(id, 1);

        next();
    },

    find : function(query, next) {
        // TODO: Query
        next(null, memes);
    },

    insert : function(meme, next) {
        meme.id = memes.length;
        memes.push(meme);

        next(null, meme);
    }
};

module.exports = memeStore;