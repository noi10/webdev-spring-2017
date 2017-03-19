module.exports = function () {

    var api = {
        createUser: createUser,
        findUserById : findUserById,
        findUserByUsername : findUserByUsername,
        updateUser : updateUser,
        findUserByCredentials : findUserByCredentials,
        removeUser : removeUser
    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function removeUser(userId){
        return UserModel.remove({_id: userId});
    }
    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        });
    }
    function updateUser(userId, user) {
        return UserModel
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
                }
            );
    }
    function findUserByUsername(userName) {
        return UserModel.find({username : userName});
    }
    function findUserById(userId) {
        //UserModel.find({_id : userId})
        return UserModel.findById(userId);
    }

    function createUser(user) {
        return UserModel.create(user);
    }
};
