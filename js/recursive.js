angular.module("training", [])
    .directive("mmTree", function () {
        return {
            scope: {items: '='},
            restrict: 'E',
            template: "<div ng-repeat='item in items'>" +
                "{{item.name}}" +
                "<mm-tree items='item.children'></mm-tree>" +
                "</div>"

        }
    })
;