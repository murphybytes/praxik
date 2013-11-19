l = console.log;
var app = angular.module("MyInputs", ['ng']);

app.directive('date', function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><span class="required" ng-show="isReq">* </span><strong ng-transclude></strong></label>' +
                '<div class="controls">' +
                '<input type="text" datepicker-popup="dd-MMMM-yyyy" show-weeks="false" ng-model="ngModel" />' +
                '</div>' +
                '</div>',
      scope: {
              ngModel: '=',
              name: '@name',
          },
      replace: true,
      transclude: true,
      priority: 10,
      link: function (scope, element, attrs) {
          scope.isReq = false;
      },
      compile: function (tElement, tAttrs, transclude) {
            var tInput = tElement.find('input');
            
             angular.forEach(tAttrs, function(value, key) {
                if ( (key.charAt(0) == '$') || (key == 'ngModel') ) {
                    return;
                }

                if (key == 'req') {
                  tInput.attr('required', 'true');
                  return;
                }
                
                tInput.attr(key, value);
            });

            ['datepickerPopup', 'ngModel', 'ngChange', 'type', 'placeholder'].forEach(function(name) {
                tElement.removeAttr(tAttrs.$attr[name]);
            });

            return;
        },
    };
});


app.directive('text', function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><strong ng-transclude></strong></label>' +
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
      link: function (scope, element, attrs) {
      },
      compile: function (tElement, tAttrs, transclude) {
            var tInput = tElement.find('input'),
                tLabel = tElement.find('label');
            
             
             angular.forEach(tAttrs, function(value, key) {
                if ( (key.charAt(0) == '$') || (key == 'ngModel') ) {
                    return;
                }

                if (key == 'req') {
                  tInput.attr('required', 'true');
                  tLabel.append('<span class="required">* </span>');
                  return;
                }
                
                tInput.attr(key, value);
            });

            ['datepickerPopup', 'ngModel', 'ngChange', 'type', 'placeholder'].forEach(function(name) {
                tElement.removeAttr(tAttrs.$attr[name]);
            });

            return;
        },
    };
});

app.directive('coll', function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><span class="required">* </span><strong ng-transclude></strong></label>' +
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
             var tInput = tElement.find('select');
            
             angular.forEach(tAttrs, function(value, key) {
                if ( (key.charAt(0) == '$') || (key == 'ngModel') || (key == 'options') ) {
                    return;
                }

                if (key == 'req') {
                  tInput.attr('required', 'true');
                  return;
                }
                
                tInput.attr(key, value);
            });

            ['ngModel', 'ngChange', 'type', 'placeholder'].forEach(function(name) {
                tElement.removeAttr(tAttrs.$attr[name]);
            });


            return;
        },
    };
});

app.directive('radio', function() {
    return {
      restrict: 'E',
      template: '<div class="control-group">' +
                '<label for="name" class="control-label"><span class="required">* </span><strong ng-transclude></strong></label>' +
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
      controller: function($scope, $location) {
          var steps = [], currentStep;
          this.totalSteps = 0;
          this.addStep = function(step) {
              if (steps.length == 0) {
                currentStep = step;
                step.showMe = true;
              }

              steps.push(step);
              this.totalSteps = this.totalSteps + 1;
          }
          
          this.isValidCurrentStep = function() {
              return currentStep.isValid();
          }

          this.step = function(step) {
              var el = steps[step - 1];

              if(el) {
                  if ( el.hasLocation ) {
                      $location.path("/"+el.hasLocation);
                  } else {
                      for(var i in steps) {
                          steps[i].showMe = false;
                      }

                      el.showMe = true;
                      currentStep = el;
                  }
              }
          }
      }
    };
});

app.directive('step', function() {
    return {
      require: '^?steps',
      restrict: 'EA',
      template: '<form ng-show="showMe" ng-transclude class="multipage-form-step"></form>',
      scope: { },
      replace: true,
      transclude: true,
      link: function(scope, element, attrs, stepsController) {
          scope.showMe = false;
          stepsController.addStep(scope);

          var form = element.find('input').eq(0).controller('form');
          scope.hasLocation = attrs.href;

          scope.isValid = function() {
              if (form) {
                return form.$valid;
              } else {
                  return true;
              }
          }
      }
    };
});

app.directive('next', function() {
    return {
      require: '^?steps',
      restrict: 'EA',
      template: '<button ng-click="next()" ng-transclude ng-disabled="isValid()"></button>',
      replace: true,
      transclude: true,
      link: function(scope, element, attrs, stepsController) {
          scope.step = 1;

          scope.isValid = function() {
              return !stepsController.isValidCurrentStep();
          }

          scope.next = function() {
            if(scope.step < stepsController.totalSteps) {
              scope.step = scope.step + 1;
              stepsController.step(scope.step);
            }
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

app.directive('uploadFile', function() {
    return {
      require: '^?steps',
      restrict: 'EA',
      template: '<div>' +
                '<div class="drop-box" ng-file-drop="onFileSelect($files)" ng-file-drag-over-class="optional-css-class">drop files here</div>' +
                '</div>',
      replace: true,
      transclude: true,
      scope: {
          ngModel: "=",
          dir: "@",
      },
      link: function(scope, element, attrs, stepsController) {
      },
      controller: function($scope, $upload) {
          $scope.onFileSelect = function($files) {
              //$files: an array of files selected, each file has name, size, and type.
              var files = [];
              angular.forEach($files, function(f) {
                  if ( f.type == "application/pdf" ) {
                      files.push(f);
                  }
              });

              angular.forEach(files, function(file) {
                  $scope.upload = $upload.upload({
                      url: '/account/upload',
                      headers: {'headerKey': 'headerValue'}, withCredential: true,
                      data: {dir: $scope.dir},
                      file: file,
                      progress: function(evt) {
                          $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
                          console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                      }
                  }).success(function(data, status, headers, config) {
                      if ( !$scope.ngModel ) {
                        $scope.ngModel = [];
                      }
                      $scope.ngModel.push(data);
                  })
                  //.error(...).then(...); 
              });
          }
      }
    }
});


