'use strict';

angular
  .module('libmeetingApp', [
    'ngRoute',
    'timer'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('catsInfos', function() {
    return {
        'A' : {price: 2500, color: '#3071a9'},
        'B' : {price: 2000, color: '#449d44'},
        'C' : {price: 1500, color: '#d58512'}
      };
  });