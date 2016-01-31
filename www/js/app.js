// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ec-controllers', 'ec-directives'])


.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/home')

  $stateProvider.state('home', {
    url: '/home',
    views: {
      home: {
        templateUrl: "js/templates/home.html",
        controller: 'ec-search-controller'
      }
    }
  })
  $stateProvider.state('list', {
      url: '/list',
      views: {
        home: {
          templateUrl: 'js/templates/list.html',
          controller: 'ec-search-controller'
        }
      }
  })
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});



