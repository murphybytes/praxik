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
            var modelLoaded,
                map = new Maps(element[0]);

            map.addListener(scope);

            scope.$watch("zoomTo", function (value) {
                if( value ) {
                  map.zoomTo(value.mapDraw);
                }
            });

            scope.$watch("ngModel", function (value) {
                if ( !modelLoaded && value ) {
                    map.drawFeatures(mapBy("mapDraw", value));
                    modelLoaded = true;
                }
            }, true);
        },
        controller: function($scope) {
            function addToModel(feature) {
                if ( !$scope.ngModel ) {
                    $scope.ngModel = [];
                }

                var data = {mapDraw: feature.toGeoJSON()};
                $scope.ngModel.push(data);
            }

            $scope.onCreateDraw = function(feature) {
                addToModel(feature);
            }

            $scope.onDeleteDraw = function(feature) {
                console.log(feature, "onDelete", $scope.ngModel);
                //$scope.ngModel = feature.toGeoJSON();
            }
        }
    };
});

function mapBy(fieldName, coll) {
    var values = [];
    if (coll) {
        angular.forEach(coll, function(data) {
            values.push(data[fieldName]);
        });
    }

    return values
}
