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
            replace: true,
            transclude: true,
            controller: function ($scope, $element, $attrs) {
                this.elements = [];
                if ("onlyOne" in $attrs) {
                    this.parentId = $attrs.id;
                }
                this.add = function (id) {
                    if (id == undefined) {
                        id = $attrs.id + "_" + this.elements.length;
                    }
                    console.log("adding " + id);
                    this.elements.push(id);
                    return id;
                };
                this.getBodyId = function () {
                    return this.elements[this.elements.length - 1];
                }

            },
            template: "<div class='panel-group' ng-transclude></div>"
        }
    })
    .directive("mmAccordionElement",function () {
        return {
            require: '^mmAccordion',
            scope: {title: '@', elementId: '@'},
            replace: true,
            transclude: true,
            restrict: 'EA',
            controller: function ($scope) {
                this.elementId = $scope.elementId;
            },
            template: function (tElement, tAttributes) {
                if ("title" in tAttributes) {
                    return '<div class="panel panel-default">' +
                        '   <mm-accordion-header>' +
                        '    {{title}}' +
                        '   </mm-accordion-header>' +
                        '   <mm-accordion-body >' +
                        '    <div ng-transclude></div>' +
                        '   </mm-accordion-body>' +
                        '</div>';
                } else {
                    return '<div class="panel panel-default" ng-transclude></div>';
                }
            }
        }
    }).directive("mmAccordionHeader", function () {
        return {
            require: ['^mmAccordionElement', '^mmAccordion'],
            restrict: 'EA',
            replace: true,

            link: function (scope, element, attrs, ctrls) {
                console.log("header");
                ctrls[1].add(ctrls[0].elementId);
                scope.href = ctrls[1].getBodyId();
                scope.parentId = ctrls[1].parentId;
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
            scope: {},
            link: function (scope, element, attrs, ctrl) {
                console.log("body");
                scope.id = ctrl.getBodyId();
            },
            template: '<div id="{{ id }}" class="panel-collapse collapse ">' +
                '   <div class="panel-body" ng-transclude>' +
                '   </div>' +
                '</div>'
        }
    });
angular.module("training", ["directives"]);