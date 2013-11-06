var app = angular.module("GoogleMap", ['ngResource']);


app.directive('map', function() {
    return {
        require: 'ngModel',
        restrict: 'EA',
        template: '<div class="map-container"></div>',
        replace: true,
        transclude: true,
        scope: {
            ngModel: "=",
            zoomTo: "="
        },
        link: function(scope, element, attrs) {
            console.log(element.children().children()[2]);
            var modelLoaded,
                //map = new Maps(element.children().children()[2]);
                map = new Maps(element[0]);

            map.addListener(scope);

            scope.$watch("zoomTo", function (value) { 
                if( value ) {
                  map.zoomTo(value);
                }
            });

            scope.$watch("ngModel", function (value) { 
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
