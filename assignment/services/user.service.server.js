module.exports = function (app, model) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserByUserId);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

//    var users = [
//        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
//        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
//        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
//        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
//    ];

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model.userModel
            .removeUser(userId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(err){
                    res.sendStatus(400).send(err);
                }
            );
        /*        for(var u in users) {
            if(users[u]._id === userId) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/
    }

    function createUser(req, res) {
        var newUser = req.body;
        //newUser._id = (new Date()).getTime() + "";
        // users.push(newUser);
        model.userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
        //res.json(newUser);
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var newUser = req.body;
        model.userModel
            .updateUser(userId, newUser)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                }
            );
        console.log(userId);
/*        for(var u in users) {
            var user = users[u];
            if( user._id === userId ) {
                var newUser = req.body;
                users[u].firstName = newUser.firstName;
                users[u].lastName = newUser.lastName;
                users[u].password = newUser.password;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);*/

    }

    function findUserByUserId(req, res) {
        var userId = req.params['userId'];
        model.userModel
            .findUserById(userId)
            .then(
                function(user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model.userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log(user);
                    if (user != []) {
                        //console.log(user);
                        res.json(user[0]);
                    } else {
                        res.sendStatus(404).send('OK to use');
                    }
                }
            );
    }

    function findUserByCredentials(req, res){
        var username = req.query['username'];
        var password = req.query['password'];
        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function(user){
                    if (user) {
                        res.json(user);
                    } else {
                        console.log('Hi');
                        res.send(null);
                    }

                },
                function(err){
                    res.sendStatus(400).send(err);
                }
            )

        /*       var user = users.find(function(u){
            return u.username == username && u.password == password;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404).send('User not found for username: ' + username + ' and password: ' + password);
        }*/
    }
};