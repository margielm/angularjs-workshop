angular.module("directives", []).directive("jlSpeaker", function () {
    return {
        templateUrl: "templates/speaker.html",
        replace: true
    }
});