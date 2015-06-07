/* Controller file for 1 page last.fm app */
var lastfmController = angular.module('lastfmController', ['ngResource','masonry']);

//TODO: Combine these make method a variable, to have a better code efficiency

// Retrieving top artists
lastfmController.factory("TopArtists", function($resource) {
  return $resource("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=2fcaa4e8de1b595c17d6e1d260363f97&format=json");
});

// Retrieving artist info of a selected artist
lastfmController.factory("ArtistInfo", function($resource) {
  return $resource("http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=:artist&api_key=2fcaa4e8de1b595c17d6e1d260363f97&format=json", {artist:'Michael Jackson'});
});

//Searching results from lastfm that matches the search term.
lastfmController.factory("ArtistSearch", function($resource) {
  return $resource("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=:artist&limit=5&page=1&api_key=2fcaa4e8de1b595c17d6e1d260363f97&format=json", {artist:'Michael Jackson'});
});



/* Load some artist list. */
lastfmController.controller('ArtistsListCtrl', 
	function($scope, TopArtists) {
		TopArtists.get(function(data){
			$scope.artists = data.artists.artist;
		});
});

/* Load some artist info. */
lastfmController.controller('ArtistDetailCtrl', 
	function($scope, ArtistInfo, $routeParams) {
		ArtistInfo.get({artist:$routeParams.artistName}, function(data){
			$scope.artist = data.artist;
			$('#liveSearchResults').hide();
		});
});

// Load the list of artist returned from lastfm matches the search term
lastfmController.controller('SearchCtrl',
	function($scope, ArtistSearch){
		$scope.change = function() {
			if ($scope.liveQuery != '') {
				ArtistSearch.get({artist:$scope.liveQuery}, function(data){
					//There are results, display them
					$('#liveSearchResults').show();
					$scope.searchresults = data.results.artistmatches.artist;
				});
			} else {
				//No search term in the input textfield, hide the list.
				$('#liveSearchResults').hide();
			}
		};
		
});

$('.result a').click(function(){
	$('#liveSearchResults').hide();
	$('#querybox').val('');
});