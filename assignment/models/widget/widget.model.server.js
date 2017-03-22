module.exports = function () {
    var model = {};

    var q = require('q');
    var mongoose = require("mongoose");


    var WidgetSchema = require("./widget.schema.server")();

    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        updateWidget: updateWidget,
        findWidgetById: findWidgetById,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function reorderWidget(pageId, start, end) {
        return model.pageModel.reorderWidget(pageId, start, end);
    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function setModel(_model) {
        model = _model;
    }



    function findWidgetById(widgetId) {
        var deffered = q.defer();
        WidgetModel
            .findById(widgetId
                , function(err, widget) {
                    deffered.resolve(widget);
                });
        return deffered.promise;
    }

    function updateWidget(widgetId, newWidget){
        console.log(widgetId, newWidget);
        var deffered = q.defer();
        switch(newWidget.type) {
            case "HEADING":
                WidgetModel
                    .update(
                        {_id: widgetId},
                        {
                            text: newWidget.text,
                            size: newWidget.size
                        },
                        function (err, status){
                            deffered.resolve(status);
                        }
                    );
                break;
            case "HTML":
                WidgetModel
                    .update(
                        {_id: widgetId},
                        {
                            text: newWidget.text
                        },
                        function (err, status){
                            deffered.resolve(status);
                        }
                    );
                break;
            case "IMAGE":
                WidgetModel
                    .update(
                        {_id: widgetId},
                        {
                            url: newWidget.url,
                            width: newWidget.width
                        },
                        function (err, status){
                            deffered.resolve(status);
                        }
                    );
                break;
            case "YOUTUBE":
                WidgetModel
                    .update(
                        {_id: widgetId},
                        {
                            url: newWidget.url,
                            width: newWidget.width
                        },
                        function (err, status){
                            deffered.resolve(status);
                        }
                    );
                break;
            case "TEXT":
                WidgetModel
                    .update(
                        {_id: widgetId},
                        {
                            text: newWidget.text,
                            rows: newWidget.rows,
                            placeholder: newWidget.placeholder,
                            formatted: newWidget.formatted
                        },
                        function (err, status){
                            //console.log("TEXT");
                            //console.log(widget);
                            deffered.resolve(status);
                        }
                    );
                break;
        }
        return deffered.promise;
    }
    function deleteWidget(widgetId) {
        var deffered = q.defer();

        WidgetModel
            .findById(widgetId)
            .then(function( widgetObj) {
                var pageId = widgetObj._page;
                model.pageModel
                    .removeFromPage(pageId, widgetId)
                    .then(function(status) {
                        WidgetModel
                            .remove({_id: widgetId},
                                function(err, status) {
                                    deffered.resolve(status);
                                });
                    })
            });
        return deffered.promise;
    }
    function createWidget(pageId, widget){
        var deffered = q.defer();
        WidgetModel
            .create(widget
                , function(err, widget) {
                    model.pageModel.findPageById(pageId)
                        .then( function (pageObj) {
                            pageObj.widgets.push(widget);
                            widget._page = pageObj._id;
                            //console.log(page);
                            pageObj.save(); 
                            widget.save();
                        });
                    deffered.resolve(widget);
                });
        return deffered.promise;
    }
};

