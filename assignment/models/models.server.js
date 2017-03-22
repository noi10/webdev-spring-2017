module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    // when test locally
    mongoose.connect('mongodb://localhost/webdev');

    // when deploy to heroku
    //mongoose.connect('mongodb://noi2010:qwerty1130@ds147167.mlab.com:47167/heroku_kgz7xmd8');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel : userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    websiteModel.setModel(model);
    userModel.setModel(model);
    pageModel.setModel(model);
    widgetModel.setModel(model);

    return model;
};
