angular.module('SurfSpot')
.directive('ssSlider', function () {
    return {
        restrict: 'E',
        scope: {
            position: '='
        },
        templateUrl: 'templates/directives/ssSlider.html',
        replace: true,
        link: function(scope, slider, attrs) {
            scope.clicked = false;
            scope.roundedPosition = scope.position;

            scope.renderSlider = function () {
                var tab = slider.find('.slider-tab');
                var tabWidth = tab.width();
                var parentWidth = slider.width();
                var newLeft = (parentWidth - tabWidth) * scope.position / 100;
                tab.css('left', newLeft + "px");
            }

            scope.getNewPosition = function (distance) {
                var tab = slider.find('.slider-tab');
                var oldLeft = Number(tab.css('left').replace('px', ''));
                var tabWidth = tab.width();
                var parentWidth = slider.width();
                var positionDif = distance / (parentWidth - tabWidth) * 100;
                var newPosition = scope.position + positionDif;
                if (newPosition < 0 || newPosition > 100) {
                    newPosition = scope.position;
                }
                return newPosition;
            }

            scope.renderSlider();

            var tab = slider.find('.slider-tab');

            var startPointX;

            tab.on('mousedown', function (event) {
                scope.clicked = true;
                startPointX = event.clientX;
                scope.$digest();
            });

            tab.on('touchstart', function (event) {
                scope.clicked = true;
                startPointX = event.clientX;
                scope.$digest();
            });

            jQuery(document).on('mousemove', function (event) {
                if (scope.clicked) {
                    var distanceX = event.clientX - startPointX;
                    scope.position = scope.getNewPosition(distanceX);
                    scope.roundedPosition = Math.floor(scope.position + 0.5);
                    scope.renderSlider();
                    startPointX = event.clientX;
                    scope.$digest();
                }
            });

            jQuery(document).on('touchmove', function (event) {
                if (scope.clicked) {
                    var distanceX = event.clientX - startPointX;
                    scope.position = scope.getNewPosition(distanceX);
                    scope.roundedPosition = Math.floor(scope.position + 0.5);
                    scope.renderSlider();
                    startPointX = event.clientX;
                    scope.$digest();
                }
            });

            jQuery(document).on('mouseup', function () {
                scope.clicked = false;
                scope.$digest();
            });

            jQuery(document).on('touchend', function () {
                scope.clicked = false;
                scope.$digest();
            });

            
        }
    }
});