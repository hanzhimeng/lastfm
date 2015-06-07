'use strict';

/* App Module */

var lastfmApp = angular.module('lastfmApp', [
  'ngRoute',
  'ngAnimate',
  'lastfmController'
]);

//Route info about the app, load top artists on default, and when users click on any artist, display the detail page.
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