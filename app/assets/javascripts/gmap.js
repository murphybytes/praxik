var app = angular.module("GoogleMap", ['ngResource']);


app.directive('map', function() {
    return {
        restrict: 'EA',
        template: '<div class="control-group">' +
                  '<div class="map-container"></div>' +
                  '</div>',
        replace: true,
        scope: {
            ngModel: "=",
            zoomTo:  "@",
            label:   "@"
        },
        link: function(scope, element, attrs) {
            map = new Maps(element.children()[0]);
            map.addListener(this);

            this.onCreateDraw = function(draw) {
              console.log("added", new L.GeoJSON(draw));
            }

            return;
        },
        controller: function($scope) {
        }
    };
});


app.directive('mappp', function() {
    return {
        restrict: 'EA',
    templateUrl: "map.html",
    scope: {
        ngModel: "=",
    zoomTo:  "=",
    label:   "="
    },
    replace: true,
    transclude: true,
    controller: function($scope) {
        //var map, modelLoaded;
        //$scope.inSelectMode = false;
        //$scope.mapType = "hybrid";

        //$scope.$watch("mapType", function (value) { 
        //    map.changeMapView(value);
        //});

        //this.onUpdate = function (data) {
        //    $scope.ngModel = data;
        //}

        this.setMap = function (nmap) {
            map = nmap;
            //map.render($scope.label);
        }

        //$scope.$watch("zoomTo", function (value) { 
        //    map.zoomTo(value);
        //});

        //$scope.$watch("ngModel", function (value) { 
        //  if( !modelLoaded && value) {
        //    map.drawFeatures(value, $scope.label);
        //    modelLoaded = true;
        //  }
        //}, true);

        //this.onFeatureUnSelect = function() {
        //  $scope.inSelectMode = false;
        //  console.log("was in sel");
        //}

        //this.onFeatureSelect = function() {
        //  $scope.inSelectMode = true;
        //  console.log("was sel");
        //}

        //$scope.deleteSelectedFeature = function() {
        //    map.deleteSelectedFeature();
        //}

        //$scope.clean = function() {
        //  map.clean();
        //}

        //$scope.draw = function() {
        //  map.drawFeatures();
        //}

        //$scope.mode = function(mode) {
        //    $scope.inSelectMode = false;
        //    map.changeMapMode(mode);
        //}
    }
    };
});

