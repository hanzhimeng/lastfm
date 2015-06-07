'use strict';

/* App Module */

var lastfmApp = angular.module('lastfmApp', [
  'ngRoute',
  'ngAnimate',
  'lastfmController'
]);

lastfmApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/topartists', {
        templateUrl: 'partial/top-artists.html',
        controller: 'ArtistsListCtrl'
      }).
      when('/artist/:artistName', {
        templateUrl: 'partial/artist-details.html',
        controller: 'ArtistDetailCtrl'
      }).
      otherwise({
        redirectTo: '/topartists'
      });
  }]);