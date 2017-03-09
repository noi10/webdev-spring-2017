module.exports = function (app) {
    app.get('/api/user/:userId/website', findAllWebsitesForUser);
    app.get('/api/website/:websiteId', findWebsiteById);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);
    app.post('/api/user/:userId/website', createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
    ];

    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId === websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['websiteId'];
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
                res.send(website);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['websiteId'];
        //console.log(websiteId);
        for(var w in websites) {
            var website = websites[w];
            if( website._id === websiteId ) {
                var newWebsite = req.body;
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                //websites[w].name = newWebsite.name;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var newWebsite = req.body;
        //console.log(newWebsite);
        newWebsite._id = (new Date()).getTime() + "";
        newWebsite.created = new Date();
        newWebsite.developerId = req.params['userId'];
        websites.push(newWebsite);
        //console.log(websites);
        res.json(newWebsite);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        //console.log(websiteId);
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};