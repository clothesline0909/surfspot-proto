angular.module('SurfSpot')
.run(['$http', '$httpBackend', function ($http, $httpBackend) {

    $httpBackend.whenGET(/views\/.*/).passThrough();
    $httpBackend.whenGET(/templates\/.*/).passThrough();
    $httpBackend.whenGET(/directives\/.*/).passThrough();

    /* HTTP GET requests:
        // Returns current information about a particular spot.
        /api/spots/@id/current
        // Returns information about a current spot in a particular time range
        /api/spots/@id/range
        params: 
            start-time = the timestamp
        // Returns current information about the best matching spots.
        /api/spots/search experience=35&board-length=2.286&...
        params: 
            name = a text string for the beach name
            experience = 1 to 100, how experienced the surfer is
            board-length =  how long the board they're using is
        // Returns average information about a spot by month
        /api/spots/@id/average
        // Returns the users preferences
        /api/users/@id
        // Creates a new user
        /api/users/create
    */

    

}]);