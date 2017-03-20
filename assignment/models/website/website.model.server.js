module.exports = function () {
    var model = {};

    var q = require('q');
    var mongoose = require("mongoose");


    var WebsiteSchema = require("./website.schema.server")();

    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);
    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        updateWebsite: updateWebsite,
        findWebsiteById: findWebsiteById,
        deleteWebsite: deleteWebsite,
        setModel: setModel
    };
    return api;


    function findAllWebsitesForUser(userId) {
/*        var deffered = q.defer();
        WebsiteModel
            .remove({_id: websiteId},
                function(err, status) {
                    deffered.resolve(status);
                });
        return deffered.promise;*/
        //return model.userModel.findAllWebsitesForUser(userId);
        var deffered = q.defer();
        model.userModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    console.log(websites);
                    deffered.resolve(websites);
                },
                function(err){
                    console.log(err);
                }
            );

        return deffered.promise;

    }

    function setModel(_model) {
        model = _model;
    }

    function deleteWebsite(websiteId) {
        var deffered = q.defer();
        WebsiteModel
            .remove({_id: websiteId},
                function(err, status) {
                    deffered.resolve(status);
                });
        return deffered.promise;
    }

    function findWebsiteById(websiteId) {
        var deffered = q.defer();
        WebsiteModel
            .findById(websiteId
                , function(err, website) {
                    deffered.resolve(website);
                });
        return deffered.promise;
    }

    function updateWebsite(websiteId, newWebsite){
        var deffered = q.defer();
        WebsiteModel
            .update(
                {
                    _id: websiteId
                },
                {
                    name: newWebsite.name,
                    description: newWebsite.description
                },
                function (err, website){
                    deffered.resolve(website);
                }
            );
        return deffered.promise;
    }

    function createWebsite(userId, website){
        var deffered = q.defer();
        WebsiteModel
            .create(website
                , function(err, website) {
                    model.userModel.findUserById(userId)
                        .then( function (userObj) {
                            userObj.websites.push(website);
                            website._user = userObj._id;
                            userObj.save();
                        });
                    deffered.resolve(website);
                });
        return deffered.promise;
    }
};
