(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;


        function init() {
            vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);

            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
            //console.log(vm.websites);
            //console.log(vm.website);
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };

        function updateWebsite (newWebsite) {
            WebsiteService.updateWebsite(vm.websiteId, newWebsite);
            $location.url("/user/"+vm.userId+"/website");
        }
    }
})();