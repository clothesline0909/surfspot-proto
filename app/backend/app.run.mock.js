angular.module('SurfSpot')
.run(['$http', '$httpBackend', function ($http, $httpBackend) {

    $httpBackend.whenGET(/views\/.*/).passThrough();
    $httpBackend.whenGET(/templates\/.*/).passThrough();
    $httpBackend.whenGET(/directives\/.*/).passThrough();

    /* HTTP GET requests:
        // Returns current information about a particular spot.
        /api/spots/current/@id
        // Returns current information about the best matching spots.
        /api/spots/search?experience=35&board-length=2.286&...
        // Returns average information about a spot by month
        /api/spots/@id/average

}]);