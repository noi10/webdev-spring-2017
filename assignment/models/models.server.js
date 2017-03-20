module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    mongoose.connect('mongodb://localhost/webdev');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();

    var model = {
        userModel : userModel,
        websiteModel: websiteModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    return model;
};
