(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    
    function WidgetService($http) {
        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "createWidget": createWidget,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widgetType) {
            return $http.post('/api/page/'+ pageId+ '/widget', widgetType);
        }

        function updateWidget(widgetId, newWidget) {
            return $http.put('/api/widget/'+widgetId, newWidget);
        }

        function deleteWidget(widgetId) {
            return $http.delete('/api/widget/'+widgetId);
        }
        function findWidgetsByPageId(pageId) {
            return $http.get('/api/page/'+pageId+'/widget');
        }

        function findWidgetById(widgetId) {
            return $http.get('/api/widget/' + widgetId);
        }
    }
})();