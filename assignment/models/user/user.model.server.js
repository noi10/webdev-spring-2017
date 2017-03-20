 module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        updateUser : updateUser,
        findUserByCredentials : findUserByCredentials,
        removeUser : removeUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        setModel : setModel
    };

    var model = {};
    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    var q = require('q');

    return api;

    function findAllWebsitesForUser(userId){
        //console.log(userId);
        var deffered = q.defer();
        UserModel
            .findById(userId)
            .populate("websites")
            .exec(function (err, Obj) {
                console.log("Hello from usermodel");
                deffered.resolve(Obj.websites);
            });
        console.log("Hello");
        return deffered.promise;
    }
    function setModel(_model) {
         model = _model;
    }

    function removeUser(userId){
        var deffered = q.defer();
        UserModel
            .remove({_id: userId},
            function(err, status) {
                deffered.resolve(status);
            });
        return deffered.promise;
    }
    function findUserByCredentials(username, password) {
        var deffered = q.defer();
        UserModel.findOne({
            username: username,
            password: password
        }, function (err, user){
            deffered.resolve(user);
        });
        return deffered.promise;
    }
    function updateUser(userId, user) {
        var deffered = q.defer();
        UserModel
            .update(
                {
                    _id: userId
                },
                {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                },
                function (err, user){
                    deffered.resolve(user);
                }
            );
        return deffered.promise;
    }
    function findUserByUsername(userName) {
        var deffered = q.defer();
        UserModel
            .find({
                username : userName
            }, function(err, user) {
                deffered.resolve(user);
            });
        return deffered.promise;
    }
    function findUserById(userId) {
        //UserModel.find({_id : userId})
        var deffered = q.defer();
        UserModel
            .findById(userId
            , function(err, user) {
                deffered.resolve(user);
            });
        return deffered.promise;
    }

    function createUser(user) {
        var deffered = q.defer();
        UserModel
            .create(user
            , function(err, user) {
                deffered.resolve(user);
            });
        return deffered.promise;
    }
};
