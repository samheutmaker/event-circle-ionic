angular.module('ec-directives', [])

.directive('ecMap', ['$ionicPlatform', function($ionicPlatform){

	return {
		restrict: 'E',
    scope: {
      	onCreate: '&'
    },
		link: function($scope, $element, $attr) {

			var renderMap = function(position){

				var latlngMapCenter = [position.coords.latitude, position.coords.longitude];

				var mapOptions = {
    					center: latlngMapCenter,
    					zoom: 13,
    					zoomControl: false
  					};

  				L.mapbox.accessToken ='pk.eyJ1Ijoic2FtaGV1dG1ha2VyIiwiYSI6ImNpZnU3enFseTFvbDd1NmtzNTd2Y2p0NHIifQ.sDALtAwT6RWcHdk2jhkBEw';

				 var map = L.mapbox.map($element[0], 'mapbox.streets', mapOptions);

				 $scope.onCreate({map: map});

			}

			var logError = function(err) {
				alert(err.code);
			}

			var locationSettings = {
						maximumAge:600000, 
						timeout:5000, 
						enableHighAccuracy: true
					};

      		//get user location
      		$ionicPlatform.ready(function() {
      			navigator.geolocation.getCurrentPosition(renderMap, logError, locationSettings);
      			
			});


		}
	}
}])