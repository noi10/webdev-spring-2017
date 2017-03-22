(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', sortableDir);

    function sortableDir($routeParams, $http) {
        function linkFunc(scope, element, attributes) {
            element.sortable({
                axis: 'y',
                start: function(event, ui) {
                    var start_pos = ui.item.index();
                    ui.item.data('start_pos', start_pos);
                },
                update: function (event, ui) {
                    var start_pos = ui.item.data('start_pos');
                    var end_pos = ui.item.index();
                    var pageId = $routeParams.pid;
                    console.log(pageId);
                    $http.put('/page/'+ pageId + '/widget?start='+ start_pos+ '&end=' + end_pos);
                }
            });
        }
        return {
            link: linkFunc
        };
    }
})();
