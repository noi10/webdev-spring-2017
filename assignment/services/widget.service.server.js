module.exports = function (app, model) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/page/:pageId/widget', createWidget);
    app.put('/page/:pageId/widget', reorderWidget);

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        //console.log(myFile);

        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    if (widget) {
                        widget.url = '/uploads/'+filename;
                        var callbackUrl   = "/assignment/assignment4/#/user/"+
                            userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
                        widget.save();
                        res.redirect(callbackUrl);
                    } else {
                        res.send('0');
                    }
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );

    }

    function reorderWidget(req, res){

        var start = req.query.start;
        var end = req.query.end;
        var pageId = req.params.pageId;
        model.widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function(status) {
                    res.sendStatus(status);
                },
                function(err) {
                    res.sendStatus(500).send(err);
                }
            );

    }

    function findAllWidgetsForPage(req, res) {
        model.widgetModel
            .findAllWidgetsForPage(req.params.pageId)
            .then(
                function(widgets){
                    //console.log(widgets);
                    res.json(widgets);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function(widget) {
                    if (widget) {
                        res.json(widget);
                    } else {
                        res.send('0');
                    }
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        var newWidget = req.body;
        console.log(newWidget);
        model.widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                }
            );
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        //newPage.dateCreated = (new Date()).getTime();
        model.widgetModel
            .createWidget(req.params.pageId, newWidget)
            .then(
                function(widget) {
                    console.log(widget);
                    res.json(widget);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
/*        var pageId = req.params.pageId;
        var widgetId =  (new Date()).getTime() + "";
        var widgetType = req.body;
        var widget;
        switch (widgetType.type){
            case "header":
                widget = { "_id": widgetId, "widgetType": "HEADER", "pageId": pageId, "size": null, "text":null};
                break;
            case "HTML":
                widget = { "_id": widgetId, "widgetType": "HTML", "pageId": pageId, "text":null};
                break;
            case "image":
                widget = { "_id": widgetId, "widgetType": "IMAGE", "pageId": pageId, "width": null, "url": null};
                break;
            case "youtube":
                widget = { "_id": widgetId, "widgetType": "YOUTUBE", "pageId": pageId, "width": null, "url": null};
                break;
        }
        widgets.push(widget);
        res.send(widget);*/
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .deleteWidget(widgetId)
            .then(
                function(status){
                    res.sendStatus(200);
                },
                function(err){
                    res.sendStatus(400).send(err);
                }
            );
    }

};
