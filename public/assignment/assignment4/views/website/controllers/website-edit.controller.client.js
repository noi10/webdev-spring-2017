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
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .success(renderWebsites);

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(renderWebsite);

            //console.log(vm.websites);
            //console.log(vm.website);
        }
        init();

        function renderWebsites(websites) {
            vm.websites = websites;
        }

        function renderWebsite(website) {
            vm.website = website;
        }

        function deleteWebsite (website) {
            var answer = confirm("Are you sure to delete this website?");
            console.log(answer);
            if(answer) {
                WebsiteService
                    .deleteWebsite(website._id)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function () {
                        vm.error = 'unable to remove website';
                    });
            }
        }

        function updateWebsite (newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .success( function(response) {
                     $location.url("/user/"+vm.userId+"/website");
                })
                .error( function () {
                    vm.error = "unable to update website";
                });
        }
    }
})();