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
app = angular.module('LowaFields', ['angularFileUpload', 'BackendServices', 'GoogleMap', 'ngRoute', 'ng', 'MyInputs', 'ui.bootstrap']);

app.run(function($rootScope) {
   $rootScope.data = GlobalData;
});


app.filter('normalize', function() {
  return function(input) {
      l("in filter", input);
      return input.name;
  }
});

function EditPasswordCtrl($scope, Profile) {
    $scope.doc = {};

    $scope.save = function() {
      var profile = new Profile($scope.doc);
      $scope.message = {visible: false};

      profile.$updatePassword(function(doc) {
          $scope.message.visible = true;

          if (!doc.is_valid) {
              $scope.message.type = "danger";
              $scope.message.text = doc.errors[0] || "Was not updated";
          } else {
              $scope.message.type = "success";
              $scope.message.text = "Updated successfully";
            }
      });
    }
}

function EditProfileCtrl($scope, Profile) {
    $scope.doc = Profile.get();
    $scope.message = {visible: false};

    $scope.save = function() {
        $scope.doc.$update(function(doc) {
            $scope.message.visible = true;

            if (!doc.is_valid) {
              $scope.message.type = "danger";
              $scope.message.text = doc.errors[0] || "Was not updated";
            } else {
              $scope.message.type = "success";
              $scope.message.text = "Updated successfully";
            }
        })
    }
}


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/my-reports', {
        templateUrl: 'reports/my-reports.html',
        controller: 'NewFieldCtrl'
      }).
      when('/fields/new', {
        templateUrl: 'fields/form.html',
        controller: 'NewFieldCtrl'
      }).
      when('/fields/edit/:id', {
        templateUrl: 'fields/form.html',
        controller: 'EditFieldCtrl'
      }).
      when('/fields', {
        templateUrl: 'fields/list.html',
        controller: 'MyFieldsCtrl'
      }).
      when('/', {
        templateUrl: 'pages/account.html'
      }).

      when('/operations/new', {
        templateUrl: 'operations/form.html',
        controller: 'NewOperationCtrl'
      }).
      when('/operations/edit/:id', {
        templateUrl: 'operations/form.html',
        controller: 'EditOperationCtrl'
      }).
      when('/operations', {
        templateUrl: 'operations/list.html',
        controller: 'MyOperationsCtrl'
      }).
      when('/about', {
        templateUrl: 'pages/about.html'
      }).
      when('/services', {
        templateUrl: 'pages/services.html'
      }).
      when('/contact', {
        templateUrl: 'pages/contact.html'
      }).
      when('/terms', {
        templateUrl: 'pages/terms.html'
      }).
      when('/privacy', {
        templateUrl: 'pages/privacy.html'
      }).
      when('/profile', {
        templateUrl: 'myaccount/editprofile.html',
        controller: 'EditProfileCtrl'
      }).when('/change-password', {
        templateUrl: 'myaccount/changepassword.html',
        controller: 'EditPasswordCtrl'
      })
  }]);

