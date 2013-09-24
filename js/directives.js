angular.module("directives", []).directive("mmTest", function () {
    return {
        scope: {text: '@mmAtr', dBi : '=mmBi'},
        template: "<div>{{ text }}<br><input type='text' ng-model='dBi'> </div>"
    }
});
angular.module("training", ["directives"]);