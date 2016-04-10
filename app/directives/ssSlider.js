angular.module('SurfSpot')
.directive('ssSlider', function () {
    return {
        restrict: 'E',
        scope: {
            position: '='
        },
        templateUrl: 'templates/directives/ssSlider.html',
        replace: true,
        link: function(scope, elem, attrs) {

            renderSlider(elem, scope.position);

            var tab = elem.find('.slider-tab');

            var clicked = false;
            var startPointX;

            tab.bind('mousedown', function (event) {
                clicked = true;
                startPointX = event.clientX;
            });

            jQuery(document).bind('mouseup', function () {
                clicked = false;
            });

            tab.bind('mousemove', function (event) {
                if (clicked) {
                    var distanceX = event.clientX - startPointX;
                    scope.position = getNewPosition(elem, scope.position, distanceX);
                    renderSlider(elem, scope.position);
                    startPointX = event.clientX;
                }
            });
        }
    }
});

function renderSlider(slider, position) {
    var tab = slider.find('.slider-tab');
    var tabWidth = tab.width();
    var parentWidth = slider.width();
    var slideWidth = parentWidth - tabWidth;
    var newLeft = (parentWidth - tabWidth) * position / 100;
    tab.css('left', newLeft + "px");
}

function getNewPosition(slider, position, distance) {
    var tab = slider.find('.slider-tab');
    var oldLeft = Number(tab.css('left').replace('px', ''));
    var tabWidth = tab.width();
    var parentWidth = slider.width();
    var positionDif = distance / (parentWidth - tabWidth) * 100;
    var newPosition = position + positionDif;
    if (newPosition < 0 || newPosition > 100) {
        newPosition = position;
    }
    return position;
}