module.exports = function () {
    var model = {};

    var q = require('q');
    var mongoose = require("mongoose");


    var PageSchema = require("./page.schema.server")();

    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        //updatePage: updatePage,
        //findPageById: findPageById,
        //deletePage: deletePage,
        setModel: setModel
    };
    return api;


    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
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

    function createPage(websiteId, page){
        var deffered = q.defer();
        PageModel
            .create(page
                , function(err, page) {
                    model.websiteModel.findWebsiteById(websiteId)
                        .then( function (websiteObj) {
                            websiteObj.pages.push(page);
                            page._website = websiteObj._id;
                            //console.log(page);
                            websiteObj.save();
                            page.save();
                        });
                    deffered.resolve(page);
                });
        return deffered.promise;
    }
};
