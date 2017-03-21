module.exports = function () {
    var model = {};

    var q = require('q');
    var mongoose = require("mongoose");


    var PageSchema = require("./page.schema.server")();

    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        updatePage: updatePage,
        findPageById: findPageById,
        deletePage: deletePage,
        setModel: setModel
    };
    return api;


    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function setModel(_model) {
        model = _model;
    }

    function deletePage(pageId) {
        var deffered = q.defer();
        PageModel
            .remove({_id: pageId},
                function(err, status) {
                    deffered.resolve(status);
                });
        return deffered.promise;
    }

    function findPageById(pageId) {
        var deffered = q.defer();
        PageModel
            .findById(pageId
                , function(err, page) {
                    deffered.resolve(page);
                });
        return deffered.promise;
    }

    function updatePage(pageId, newPage){
        var deffered = q.defer();
        PageModel
            .update(
                {
                    _id: pageId
                },
                {
                    name: newPage.name,
                    description: newPage.description,
                    title: newPage.title
                },
                function (err, page){
                    deffered.resolve(page);
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
