angular.module("training", [])
    .directive("mmTree", function () {
        return {
            restrict: 'E',
            template: "<div>" +
                "<script type='text/ng-template' id='tree.html'>" +
                "{{item.name}}" +
                "<div ng-include=\"'tree.html'\" ng-repeat='item in item.children'></div>" +
                "</script>" +
                "" +
                "<div ng-repeat='item in items' ng-include=\"'tree.html'\"></div>" +
                "</div>",
            link: function (scope) {
                scope.items = [
                    {name: "a", children: [
                        {name: "c"},
                        {name: "d"}
                    ]},
                    {name: "b", children: []}
                ];
            }

        }
    })
;