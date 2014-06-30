// Keep users in memory - For now! Unhashed password - For now!

var users =[
    { username : 'c.walcher@diamonddogs.cc', password: 'c.walcher@diamonddogs.cc' }
];

module.exports = {
    findByUsername: function (username, done) {
        var matchingUsers = users.filter(function (user) {
            return user.username = username;
        });

        if (matchingUsers.length === 0) {
            return done(null, null);
        }

        if (matchingUsers.length > 1) {
            return done(new Error('More than one user found with name ' + username));
        }

        done(null, matchingUsers[0]);
    },

    insert : function(user, done) {
        var createdUser = { username : username, password : password };
        users.push(createdUser);

        done(null, user);
    }
};

