angular.module('SurfSpot', ['ngRoute', 'ngMockE2E'])
.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider.when('/search', {
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