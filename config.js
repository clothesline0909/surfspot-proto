angular.module('SurfSpot', ['ngRoute', 'ngMock'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/search.html',
		controller: 'SearchController'
	})
	.when('/results', {
		templateUrl: 'views/results.html',
		controller: 'ResultsController'
	})
	.otherwise({
		redirectTo: '/'
	});

	$locationProvider.html5Mode(true);

}]);