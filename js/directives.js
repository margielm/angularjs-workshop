angular.module("directives", []).directive("mmTest", function () {
    return {
        scope: {text: '@mmAtr', dBi : '=mmBi'},
        template: "<div><input type='text' ng-model='text'><br><input type='text' ng-model='dBi'> </div>"
    }
});
angular.module("training", ["directives"]);