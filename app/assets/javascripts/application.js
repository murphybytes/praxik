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
app = angular.module('LowaFields', ['BackendServices', 'GoogleMap', 'ngRoute', 'ng', 'MyInputs', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
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
      })
  }]);

