angular.module("directives", []).directive("mmTest", function () {
    return {
        scope: {text: '@mmAtr'},
        template: "<div>{{ text }}</div>"
    }
});
angular.module("training", ["directives"]);