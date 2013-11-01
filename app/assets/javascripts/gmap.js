var app = angular.module("GoogleMap", ['ngResource']);


app.directive('mapArea', function() {
    return {
        require: "^?map",
        restrict: 'EA',
        scope: { },
        link: function(scope, element, attrs, mapController) {
            var map = new GMap(element[0], mapController);

            mapController.setMap(map);
            scope.$on("$destroy", function() {
               map.destroy();
            });

            return;
        },
    };
});


app.directive('map', function() {
    return {
        restrict: 'EA',
        templateUrl: "map.html",
        scope: {
            ngModel: "="
        },
        replace: true,
        controller: function($scope) {
            var map, modelLoaded;
            $scope.inSelectMode = false;

            this.onUpdate = function (data) {
                $scope.ngModel = data;
            }

            this.setMap = function (nmap) {
                map = nmap;
            }

            $scope.$watch("ngModel", function (value) { 
              if( !modelLoaded && value) {
                map.drawFeatures(value);
                modelLoaded = true;
              }
            }, true);

            this.onFeatureUnSelect = function() {
              $scope.inSelectMode = false;
              console.log("was in sel");
            }

            this.onFeatureSelect = function() {
              $scope.inSelectMode = true;
              console.log("was sel");
            }

            $scope.deleteSelectedFeature = function() {
                map.deleteSelectedFeature();
            }

            $scope.clean = function() {
              map.clean();
            }

            $scope.draw = function() {
              map.drawFeatures();
            }

            $scope.mode = function(mode) {
                $scope.inSelectMode = false;
                map.changeMapMode(mode);
            }
        }
    };
});

