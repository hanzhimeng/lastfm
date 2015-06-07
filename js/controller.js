/* Controller file for 1 page last.fm app */
var lastfmController = angular.module('lastfmController', ['ngResource','masonry','ngAnimate']);

lastfmController.factory("TopArtists", function($resource) {
  return $resource("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=2fcaa4e8de1b595c17d6e1d260363f97&format=json");
});

lastfmController.factory("ArtistInfo", function($resource) {
  return $resource("http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist=:artist&api_key=2fcaa4e8de1b595c17d6e1d260363f97&format=json", {artist:'Michael Jackson'});
});

lastfmController.factory("ArtistSearch", function($resource) {
  return $resource("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=:artist&limit=5&page=1&api_key=2fcaa4e8de1b595c17d6e1d260363f97&format=json", {artist:'Michael Jackson'});
});
/* Load some artist info. */
lastfmController.controller('ArtistsListCtrl', 
	function($scope, TopArtists) {
		TopArtists.get(function(data){
			$scope.artists = data.artists.artist;
		});
});

lastfmController.controller('ArtistDetailCtrl', 
	function($scope, ArtistInfo, $routeParams) {
		ArtistInfo.get({artist:$routeParams.artistName}, function(data){
			$scope.artist = data.artist;
			$('#liveSearchResults').hide();
		});
});

lastfmController.controller('SearchCtrl',
	function($scope, ArtistSearch){
		$scope.change = function() {
			if ($scope.liveQuery != '') {
				ArtistSearch.get({artist:$scope.liveQuery}, function(data){
					$('#liveSearchResults').show();
					$scope.searchresults = data.results.artistmatches.artist;
				});
			} else {
				$('#liveSearchResults').hide();
			}
		};
		
});

$('.result a').click(function(){
	$('#liveSearchResults').hide();
	$('#querybox').val('');
});