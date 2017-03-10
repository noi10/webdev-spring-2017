module.exports = function (app) {
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post('/api/page/:pageId/widget', createWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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
        widget = getWidgetById(widgetId);
        widget.url = '/uploads/'+filename;

        var callbackUrl   = "/assignment/assignment3/index.html#/user/"+
            userId+"/website/"+websiteId+"/page/"+pageId+"/widget";

        res.redirect(callbackUrl);
    }
    function getWidgetById(widgetId) {
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
                return widgets[w];
            }
        }
    }
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var wids = [];
        for(var w in widgets) {
            if(pageId === widgets[w].pageId) {
                wids.push(widgets[w]);
            }
        }
        res.json(wids);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['widgetId'];
        //console.log(widgetId);
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
                //console.log(widget);
                res.send(widget);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updateWidget(req, res) {
        var widgetId = req.params['widgetId'];
        for(var w in widgets) {
            var widget = widgets[w];
            if( widget._id === widgetId ) {
                var newWidget = req.body;
                widgets[w] = newWidget;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
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
        res.send(widget);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};
