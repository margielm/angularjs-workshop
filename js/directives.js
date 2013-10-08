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
                this.index = 0;
                this.parentId = $attrs.id;
                this.add = function () {
                    this.index += 1;
                };
                this.getBodyId = function () {
                    return this.parentId + "_" + this.index;
                }
            },
            template: "<div class='panel-group' ng-transclude></div>"
        }
    })
    .directive("mmAccordionElement",function () {
        return {
            require: '^mmAccordion',
            scope: {title: '@'},
            replace: true,
            transclude: true,
            restrict: 'EA',

            link: function (scope, element, attrs, accCtrl) {
                accCtrl.add();
            },
            template: function (tElement, tAttributes) {
                if ("title" in tAttributes) {
                    return '<div class="panel panel-default">' +
                        '<mm-accordion-header>' +
                        '   {{title}}' +
                        '</mm-accordion-header>' +
                        '<mm-accordion-body >' +
                        '<div ng-transclude></div>' +
                        '</mm-accordion-body>' +
                        '</div>';
                } else {
                    return '<div class="panel panel-default" ng-transclude></div>';
                }
            }
        }
    }).directive("mmAccordionHeader", function () {
        return {
            require: '^mmAccordion',
            restrict: 'EA',
            replace: true,

            link: function (scope, element, attrs, accCtrl) {
                scope.href = accCtrl.getBodyId();
                scope.parentId = accCtrl.parentId;
            },
            transclude: true,
            template: '<div class="panel-heading">' +
                '<h4 class="panel-title">' +
                '<a class="accordion-toggle" data-toggle="collapse"  href="#{{ href }}" data-parent="#{{parentId}}" ng-transclude>' +
                '</a>' +
                '</h4>' +
                '</div>'
        }
    })
    .directive("mmAccordionBody", function () {
        return {
            require: '^mmAccordion',
            restrict: 'EA',
            replace: true,
            transclude: true,
            link: function (scope, element, attrs, accCtrl) {
                scope.id = accCtrl.getBodyId();
                scope.parentId = accCtrl.parentId;
            },
            template: '<div id="{{ id }}" class="panel-collapse collapse ">' +
                '   <div class="panel-body" ng-transclude>' +
                '   </div>' +
                '</div>'
        }
    });
angular.module("training", ["directives"]);