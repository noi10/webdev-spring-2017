module.exports = function (app, model) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.post('/api/user/:userId/website', createWebsite);


    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        model.websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    if (website) {
                        res.json(website);
                    } else {
                        res.send('0');
                    }
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        var newWebsite = req.body;
        model.websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                }
            );
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        newWebsite.dateCreated = (new Date()).getTime();
        model.websiteModel
            .createWebsite(req.params.userId, newWebsite)
            .then(
                function(website) {
                    //console.log(website);
                    res.json(website);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findAllWebsitesForUser(req, res) {
        model.websiteModel
            .findAllWebsitesForUser(req.params.userId)
            .then(
                function(websites){
                    //console.log(websites);
                    res.json(websites);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }
    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model.websiteModel
            .deleteWebsite(websiteId)
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