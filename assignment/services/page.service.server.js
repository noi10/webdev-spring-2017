module.exports = function (app, model) {
    app.get('/api/website/:websiteId/page', findAllPagesForWebsite);
    app.get('/api/page/:pageId', findPageById);
    app.put('/api/page/:pageId', updatePage);
    app.delete('/api/page/:pageId', deletePage);
    app.post('/api/website/:websiteId/page', createPage);


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
        model.pageModel
            .findPageById(pageId)
            .then(
                function(page) {
                    if (page) {
                        res.json(page);
                    } else {
                        res.send('0');
                    }
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );

    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var newPage = req.body;
        model.pageModel
            .updatePage(pageId, newPage)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                }
            );
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
        model.pageModel
            .deletePage(pageId)
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