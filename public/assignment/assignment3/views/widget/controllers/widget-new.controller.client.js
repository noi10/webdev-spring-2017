(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function init(){
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(renderWidgets);
        }
        init();

        function renderWidgets(widgets) {
            vm.widgets = widgets;
        }

        function createWidget (widgetType) {
            console.log(widgetType);
            WidgetService
                .createWidget(vm.pageId, widgetType)
                .success(function(widget) {
                    console.log("success");
                    console.log(widget);
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/" + widget._id);
                });
        }
    }
})();