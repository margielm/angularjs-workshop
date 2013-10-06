angular.module("directives", [])
    .directive("mmTest", function () {
        return {
            scope: {text: '@mmAtr', dBi: '=mmBi'},
            template: "<div><input type='text' ng-model='text'><br><input type='text' ng-model='dBi'> </div>"
        }
    })
    .directive("mmAccordion", function () {
        return {
            restrict: 'AE',
            scope: {},
            replace: true,
            transclude: true,
            controller: function ($scope, $element, $attrs) {
                console.log($attrs.id)
                $scope.size = 0;
               this.parentId = $attrs.id;
                this.add = function () {
                    $scope.size = $scope.size + 1;
                    return $scope.size;
                }
            },
            template: "<div class='panel-group' ng-transclude>" +
                "</div>"
        }
    })
    .directive("mmAccordionElement", function () {
        return {
            require: '^mmAccordion',
            scope: {title: '@'},
            replace: true,
            transclude: true,
            restrict: 'EA',
            link: function (scope, element, attrs, accCtrl) {
                scope.size = accCtrl.add();
                console.log(scope);
                scope.parentId = accCtrl.parentId;
            },
            template: '<div class="panel panel-default">' +
                '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a class="accordion-toggle" data-toggle="collapse"  href="#{{ size }}" data-parent="#{{parentId}}">' +
                '{{title}}' +
                '</a>' +
                '</h4>' +
                '</div>' +
                '<div id="{{ size }}" class="panel-collapse collapse ">' +
                '<div class="panel-body" ng-transclude>' +
                '</div>' +
                '</div>' +
                '</div>'
        }
    })
;
angular.module("training", ["directives"]);