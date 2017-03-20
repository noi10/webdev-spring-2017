(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(renderWebsites);
        }
        init();

        function renderWebsites(websites) {
            vm.websites = websites;
            //console.log(vm.userId);
        }

        function createWebsite (website) {
            console.log(website);
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function(website) {
                    console.log("success created");
                    $location.url("/user/"+vm.userId+"/website");
                });
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);

        }
    }
})();