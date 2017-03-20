module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;
    //mongoose.connect('mongodb://localhost/webdev');
    mongoose.connect('mongodb://noi2010:qwerty1130@ds147167.mlab.com:47167/heroku_kgz7xmd8');

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
