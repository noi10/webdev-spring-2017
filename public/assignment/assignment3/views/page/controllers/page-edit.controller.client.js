(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;


        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(renderPages);

            PageService
                .findPageById(vm.pageId)
                .success(renderPage);

        }
        init();

        function renderPages(pages) {
            vm.pages = pages;
        }

        function renderPage(page) {
            vm.page = page;
        }
        function deletePage (page) {
            var answer = confirm("Are you sure to delete this page?");
            console.log(answer);
            if(answer) {
                PageService
                    .deletePage(page._id)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                    })
                    .error(function () {
                        vm.error = 'unable to remove page';
                    });
            }
        }

        function updatePage (newPage) {
            PageService
                .updatePage(vm.pageId, newPage)
                .success( function(response) {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error( function () {
                    vm.error = "unable to update page";
                });
        }

    }
})();