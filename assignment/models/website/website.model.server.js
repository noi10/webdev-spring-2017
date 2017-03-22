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
        removeFromWebsite: removeFromWebsite,
        findAllPagesForWebsite: findAllPagesForWebsite,
        setModel: setModel
    };
    return api;
    function removeFromWebsite(websiteId, pageId) {
        var deffered = q.defer();
        WebsiteModel.update (
            {_id: websiteId},
            { $pull: {'pages' :pageId}}
            ,function (err, status){
                //console.log("Hello");
                deffered.resolve(status);
            }
        );
        return deffered.promise;
    }
    function findAllPagesForWebsite(websiteId) {
        var deffered = q.defer();
        WebsiteModel
            .findById(websiteId)
            .populate("pages")
            .exec(function (err, Obj) {
                deffered.resolve(Obj.pages);
            });
        return deffered.promise;
    }

    function findAllWebsitesForUser(userId) {
        return model.userModel.findAllWebsitesForUser(userId);
    }

    function setModel(_model) {
        model = _model;
    }

    function deleteWebsite(websiteId) {
        var deffered = q.defer();
        WebsiteModel
            .findById(websiteId)
            .then(function( websiteObj) {
                var userId = websiteObj._user;
                model.userModel
                    .removeFromUser(userId, websiteId)
                    .then(function(status) {
                        WebsiteModel
                            .remove({_id: websiteId},
                                function(err, status) {
                                    deffered.resolve(status);
                                });
                    })
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
            .create(
                website
                , function(err, website) {
                    model.userModel.findUserById(userId)
                        .then( function (userObj) {
                            userObj.websites.push(website);
                            website._user = userObj._id;
                            userObj.save();
                            website.save();

                        });
                    deffered.resolve(website);
                });
        return deffered.promise;
    }
};
