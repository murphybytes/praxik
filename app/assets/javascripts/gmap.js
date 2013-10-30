
var app = angular.module("GoogleMap", ['ngResource']);

app.directive('map', function() {
    return {
      restrict: 'E',
      templateUrl: "public/pages/map.html",
      scope: { },
      replace: true,
      transclude: true,
      link: function(scope, element, attrs) {
            
            return;
        },
    };
});
