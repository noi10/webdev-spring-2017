(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;


        function init() {
            console.log(vm.widgetId);
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(renderWidgets);

            WidgetService
                .findWidgetById(vm.widgetId)
                .success(renderWidget);
        }
        init();

        function renderWidgets(widgets){
            vm.widgets = widgets;
        }

        function renderWidget(widget){
            vm.widget = widget;
        }

        function updateWidget(newWidget) {
            console.log(newWidget);
            console.log(vm.widgetId);
            WidgetService
                .updateWidget(vm.widgetId, newWidget)
                .success( function(response){
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error ( function () {
                    vm.error = "unable to update page";
                });

        }
        function deleteWidget(widget) {
            var answer = confirm("Are you sure to delete this widget?");
            console.log(answer);
            if(answer) {
                WidgetService
                    .deleteWidget(widget._id)
                    .success(function () {
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    })
                    .error(function () {
                        vm.error = 'unable to remove widget';
                    });
            }
        }
        function getEditorTemplateUrl(type) {
            //console.log(type);
            if (type) {
                return 'views/widget/templates/editors/widget-' + type + '-editor.view.client.html';
            }
        }
    }
})();