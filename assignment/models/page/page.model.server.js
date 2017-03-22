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
        removeFromPage: removeFromPage,
        reorderWidget: reorderWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        setModel: setModel
    };
    return api;

    function reorderWidget(pageId, start, end) {
        var deffered = q.defer();
        PageModel
            .findById(pageId,
                function(err, pageObj) {
                    var OrderedWidgets = pageObj.widgets;
                    var widget = OrderedWidgets.splice(start, 1);
                    OrderedWidgets.splice(end, 0, widget[0]);
                    pageObj.widgets = OrderedWidgets;
                    pageObj.save();
                    deffered.resolve('200');
                });
        return deffered.promise;
    }

    function removeFromPage(pageId, widgetId) {
        //console.log(pageId);
        //console.log(widgetId);
        var deffered = q.defer();
        PageModel.update (
            {_id: pageId},
            { $pull: {'widgets' :widgetId}}
            ,function (err, status){
                //console.log("Hello");
                deffered.resolve(status);
            }
        );
        return deffered.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deffered = q.defer();
        PageModel
            .findById(pageId)
            .populate("widgets")
            .exec(function (err, Obj) {
                //console.log(Obj);
                Obj.save();
                deffered.resolve(Obj.widgets);
            });
        return deffered.promise;
    }

    function findAllPagesForWebsite(websiteId) {
        return model.websiteModel.findAllPagesForWebsite(websiteId);
    }

    function setModel(_model) {
        model = _model;
    }

    function deletePage(pageId) {
        var deffered = q.defer();
        PageModel
            .findById(pageId)
            .then(function( pageObj) {
                var websiteId = pageObj._website;
                model.websiteModel
                    .removeFromWebsite(websiteId, pageId)
                    .then(function(status) {
                        PageModel
                            .remove({_id: pageId},
                                function(err, status) {
                                    deffered.resolve(status);
                                });
                    })
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
