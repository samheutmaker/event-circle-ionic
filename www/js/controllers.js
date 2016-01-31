angular.module('ec-controllers', [])

.controller('ec-search-controller', function($scope, $http, $ionicPlatform, $interval) {


////////// MAP //////////

	//ec-map variables

	$scope.ecMap = null;

	$scope.mapMarkers = [];

	$scope.ecMapCenter = null;

    //get map object from ec-map directive
	$scope.passMap = function(mapObject) {
		$scope.ecMap = mapObject;
		$scope.$apply();
	};


	$scope.addMarkerToMap = function(objectToMap) {


		if(objectToMap.mapped === false) {

			objectToMap.mapped = true;

			var lat = objectToMap.latlng[0];
			var lng = objectToMap.latlng[1];

		 objectToMap.marker.addTo($scope.ecMap);


		}
	}

	$scope.removeLayer = function(collection) {


			collection.forEach(function(element){
				$scope.ecMap.removeLayer(element.marker)
			});
	}


////////// USER GEOLOCATION //////////

	//User Location Variables
	$scope.userMarker = null;

	$scope.userLocationSettings = {
        	maximumAge: 600000,
        	timeout: 5000,
        	enableHighAccuracy: true
    	};


	//Watch Geolocation success callback - maps users position
	$scope.setUserPin = function(position){

		if($scope.userMarker === null) {

			$scope.userMarker = L.marker([position.coords.latitude, position.coords.longitude], {
	    		icon: L.mapbox.marker.icon({
	        		'marker-size': 'large',
	        		'marker-symbol': 'pitch',
	        		'marker-color': '#8e44ad'
	    		})
			});

			$scope.userMarker.addTo($scope.ecMap);
		} else {
			$scope.userMarker.setLatLng([position.coords.latitude, position.coords.longitude]);
		}
	};


/////////// EVENTS //////////


	//Event varibles


	$scope.eventObject = function( element ){
		this._id = element._id;
		this.eventName = element.eventName;
		this.locationName = element.locationName;
		this.address = element.address;
		this.latlng = element.latlng;
		this.mapped = false;
		this.date = {	day: element.eventDate,
						start: element.eventStart,
						end: element.eventEnd 
					};
		this.iconSettings = element.iconSettings;
		this.marker = L.marker([this.latlng[0], this.latlng[1]], {
		    				icon: L.mapbox.marker.icon(this.iconSettings)
					  });
	
	}

	//all events received from serve

	$scope.eventsReceivedLength = 0;

	$scope.allEvents = [];

	$scope.$watchCollection('allEvents',
					function(){

						$scope.allEvents.forEach( function(element) {
							$scope.addMarkerToMap(element);
						});
					});
	


	//get events from server
	$scope.getEvents = function(){

			$scope.removeLayer($scope.allEvents);

			$http.get('http://localhost:8080/api/events')
			        .success(function(data) {
			          	$scope.manageEventResults(data);
			        })
			        .error(function(data) {
			            console.log('Error: ' + data);
			        });
				};



	$scope.manageEventResults = function(results) {

	
	
	results.forEach(function(element){
		console.log(element);
		$scope.createEvent(element);
	})

	

	
	};


	$scope.createEvent = function(eventDetails) {

		var newEvent = new $scope.eventObject(eventDetails);

		$scope.allEvents.push(newEvent);


	}

////////// READY //////////

	$ionicPlatform.ready(function() {
        	$scope.watchUser = navigator.geolocation.watchPosition( $scope.setUserPin, 
        															$scope.userLocationError, 
        														$scope.userLocationSettings);

        	//get events
        	$scope.getEvents();
        	//$interval($scope.getEvents, 10000);


    	});

 	
  
})

.controller('ec-list-controller', function($scope){

	$scope.nothing = [1,2,3,4,5,6];


})