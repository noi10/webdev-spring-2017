(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService($http) {
        var api = {
            "createWebsite": createWebsite,
            "updateWebsite": updateWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findAllWebsitesForUser": findAllWebsitesForUser
        };
        return api;

        function findWebsiteById(wid) {
            return $http.get('/api/website/' + wid);
        }
        function deleteWebsite(websiteId) {
            return $http.delete('/api/website/' + websiteId);
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put('/api/website/'+websiteId, newWebsite);
        }


        function createWebsite(userId, website) {
            return $http.post("/api/user/"+userId+"/website", website);
        }

        function findAllWebsitesForUser(userId) {
            return $http.get("/api/user/"+userId+"/website");
        }

    }
})();