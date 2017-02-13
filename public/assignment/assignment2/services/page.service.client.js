(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];
        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function findPageById(pid) {
            console.log(pages)
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }
        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pageId, newPage) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages[p].name = newPage.name;
                    pages[p].description = newPage.description;
                }
            }
        }


        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            page._id =  new Date().getTime().toString ();
            //website.created = new Date();

            pages.push(page);
            console.log(pages);
        }

        function findPageByWebsiteId(websiteId) {
            var pps = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pps.push(pages[p]);
                }
            }
            return pps;
        }
    }
})();
