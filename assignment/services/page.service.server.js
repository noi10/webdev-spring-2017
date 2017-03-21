module.exports = function (app, model) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    //app.get('/api/page/:pageId', findPageById);
    //app.put('/api/page/:pageId', updatePage);
    //app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);


 //   var pages = [
 //       { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
 //       { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
 //       { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
 //   ];

    function findAllPagesForWebsite(req, res) {
        model.pageModel
            .findAllPagesForWebsite(req.params.websiteId)
            .then(
                function(pages){
                    //console.log(websites);
                    res.json(pages);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params['pageId'];
        for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
                res.send(page);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];

        for(var p in pages) {
            var page = pages[p];
            if( page._id === pageId ) {
                var newPage = req.body;
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                //websites[w].name = newWebsite.name;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res) {
        var newPage = req.body;
        newPage.dateCreated = (new Date()).getTime();
        model.pageModel
            .createPage(req.params.websiteId, newPage)
            .then(
                function(page) {
                    console.log(page);
                    res.json(page);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        //console.log(websiteId);
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};