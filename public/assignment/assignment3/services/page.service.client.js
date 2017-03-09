(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {
            "createPage": createPage,
            "updatePage": updatePage,
            "findPageById": findPageById,
            "deletePage": deletePage,
            "findPageByWebsiteId": findPageByWebsiteId
        };
        return api;

        function findPageById(pid) {
            return $http.get('/api/page/' + pid);
        }

        function deletePage(pageId) {
            return $http.delete('/api/page/' + pageId);
        }

        function updatePage(pageId, newPage) {
            return $http.put('/api/page/' + pageId, newPage)
        }


        function createPage(websiteId, page) {
            return $http.post('/api/website/'+ websiteId +'/page', page)
        }

        function findPageByWebsiteId(websiteId) {
            return $http.get('/api/website/'+ websiteId + '/page');
        }
    }
})();
