
var app = angular.module("GoogleMap", ['ngResource']);

app.directive('map', function() {
    return {
      restrict: 'EA',
      //template: "<div ng-transclude> </div>",
      scope: { },
      //replace: true,
      //transclude: true,
      link: function(scope, element, attrs) {
            map = new OpenLayers.Map(element[0], {});
            
            return;
        },
    };
});
