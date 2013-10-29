// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


l = console.log;
app = angular.module('LowaFields', ['LowaFieldsServices', 'ngRoute', 'ng', 'ui.bootstrap']);

function FieldsCtrl($scope, Data) {
    $scope.crops = ['Corn', 'Soybeans', 'Wheat', 'Oat', 'Alfalfa', 'Corn silage'];
    $scope.harvestMethods = ['Combine, corn header', 'Combine, platform header', 'Combine, row crop header', 'Silage chopper', 'Windrower'];
    $scope.field = {plans: [{}, {}, {}, {}]};
    $scope.step = 1;
    $scope.colors = ["Love", "Data"];
    $scope.vegetations = ["Perennial grass"];
    $scope.yesNo = ["Yes", "No"];
    $scope.yesNoBlank = ["Yes", "No", "Unknown"];
    $scope.ownRent = ["Own", "Rent"];
    $scope.field.color = "Love";
    $scope.conservationPractices = ["Grade stabilization full flow", "Level terraces", "Ponds and grade stabilization retention", "Tile inlet terraces"];

    $scope.$watch('field', function (value) {
        l($scope.field);
    }, true);

    //Data.get({"id": "37154664585"});
}

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/fields', {
        templateUrl: 'account/fields',
        controller: 'FieldsCtrl'
      })
  }]);

app.directive('text', function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><span class="required" ng-transclude></span></label>' +
                '<div class="controls">' +
                '<input type="text" ng-model="ngModel" />' +
                '</div>' +
                '</div>',
      scope: {
              ngModel: '=',
              name: '@name',
          },
      replace: true,
      transclude: true,
      priority: 10,
      compile: function (tElement, tAttrs, transclude) {
            var tInput = tElement.find('input');
            
            tElement.removeAttr('ng-model');
            
            return;
        },
    };
});

app.directive('coll', function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><span class="required" ng-transclude></span></label>' +
                '<div class="controls">' +
                '<select ng-model="ngModel" ng-options="c for c in options"> </select>' +
                '</div>' +
                '</div>',
      scope: {
              ngModel: '=',
              options: '=',
          },
      replace: true,
      transclude: true,
      priority: 10,
      compile: function (tElement, tAttrs, transclude) {
            tElement.removeAttr('ng-model');
            tElement.removeAttr('options');
            
            return;
        },
    };
});

app.directive('radio', function() {
    return {
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><span class="required" ng-transclude></span></label>' +
                '<div class="controls">' +
                '<label class="radio inline" ng-repeat="item in values">' +
                '<input type="radio" value="{{item}}" ng-model="$parent.ngModel">' +
                '{{item}}' +
                '</label>' +
                '</div>' +
                '</div>',
      scope: {
              ngModel: '=',
              items: '@',
              source: '=',
          },
      replace: true,
      transclude: true,
      priority: 10,
      link: function(scope, element, attrs) {
          if(scope.items) {
            scope.values = scope.items.split("|")
          }
      }
    };
});

app.directive('steps', function() {
    return {
      restrict: 'EA',
      template: '<div ng-transclude></div>',
      scope: { },
      replace: true,
      transclude: true,
      controller: function($scope) {
          var steps = [];
          this.addStep = function(step) {
              if (steps.length == 0) step.showMe = true;
              steps.push(step);
          }
          
          this.step = function(step) {
              var el = steps[step - 1]

              if(el) {
                for(var i in steps) {
                    steps[i].showMe = false;
                }
                el.showMe = true;
              }
          }
      }
    };
});

app.directive('step', function() {
    return {
      require: '^?steps',
      restrict: 'EA',
      template: '<div ng-show="showMe" ng-transclude class="multipage-form-step"></div>',
      scope: { },
      replace: true,
      transclude: true,
      link: function(scope, element, attrs, stepsController) {
          scope.showMe = false;
          stepsController.addStep(scope);
      }
    };
});

app.directive('next', function() {
    return {
      require: '^?steps',
      restrict: 'EA',
      template: '<button ng-click="next()" ng-transclude></button>',
      replace: true,
      transclude: true,
      link: function(scope, element, attrs, stepsController) {
          scope.step = 1;

          scope.next = function() {
            scope.step = scope.step + 1;
            stepsController.step(scope.step);
          }
      }
    };
});

app.directive('prev', function() {
    return {
      require: '^?steps',
      restrict: 'EA',
      template: '<button ng-show="1 < step" ng-click="prev()" ng-transclude></button>',
      replace: true,
      transclude: true,
      link: function(scope, element, attrs, stepsController) {
          scope.prev = function() {
            scope.step = scope.step - 1;
            stepsController.step(scope.step);
          }
      }
    };
});
