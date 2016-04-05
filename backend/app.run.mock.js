angular.module('SurfSpot')
.run(['$http', '$httpBackend', function ($http, $httpBackend) {

    $httpBackend.whenGET(/views\/.*/).passThrough();
    $httpBackend.whenGET(/templates\/.*/).passThrough();
    $httpBackend.whenGET(/directives\/.*/).passThrough();

}]);