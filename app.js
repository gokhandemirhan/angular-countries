var App = angular.module('angularCountry', []);

var ctrl = function($scope, $http){

	$scope.getInfo = function() {
		initialize();
		var adress = 'http://restcountries.eu/rest/name/'+$scope.enteredCountry;
		$http({method: 'GET', url: adress}).
		success(function(data, status, headers, config) {
			$scope.country = data[0];
			loadCity(data[0]);
		}).
		error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
});
	};	
}

var map;
geocoder = new google.maps.Geocoder();
function initialize() {

			/*
			Basic Setup
			*/

			var latLng = new google.maps.LatLng(48.825183,2.1975769);
			
			var myOptions = {
				panControl: true,
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				overviewMapControl: false,
				draggable: false,
				disableDoubleClickZoom: false,     //disable zooming
				scrollwheel: false,
				zoom: 5,
				center: latLng,
	      		mapTypeId: google.maps.MapTypeId.HYBRID //   ROADMAP; SATELLITE; HYBRID; TERRAIN;
	      	};

	      	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

		};//end initialize

		function loadCity(co){

			/*
			INFO Bubble
			*/

			geocoder.geocode( { 'address': co.name}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					console.log(results[0]);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location
					});

					myInfoWindowOptions = {
						content: '<div class="info-window-content"><a href="http://en.wikipedia.org/wiki/'+co.name+'" target="_new"><h3>'+co.name+'</h3></a><hr>\
						<h4>Capital: '+co.capital+'</h4><h4>Currency: '+co.currency+'</h4><h4>Region: '+co.region+'</h4></div>',
						maxWidth: 275
					};

					infoWindow = new google.maps.InfoWindow(myInfoWindowOptions);

					infoWindow.open(map,marker);


				} else {
					alert("Geocode was not successful for the following reason: " + status);
				}
			});

		};




