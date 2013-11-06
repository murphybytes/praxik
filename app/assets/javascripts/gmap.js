var app = angular.module("GoogleMap", ['ngResource']);


app.directive('map', function() {
    return {
        require: 'ngModel',
        restrict: 'EA',
        templateUrl: "map.html",
        replace: true,
        transclude: true,
        scope: {
            ngModel: "="
        },
        link: function(scope, element, attrs) {
            var modelLoaded,
                map = new Maps(element.children()[1]);

            map.addListener(scope);

            scope.$watch("ngModel", function (value) { 
                console.log(scope.ngModel);
                if( !modelLoaded && value) {
                    map.drawFeatures(value);
                    modelLoaded = true;
                }
            }, true);
        },
        controller: function($scope) {
            $scope.onCreateDraw = function(draw) {
                $scope.ngModel = draw.toGeoJSON();
            }
        }
    };
});
