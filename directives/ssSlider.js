angular.module('SurfSpot')
.directive('ssSlider', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'directives/templates/ssSlider.html',
        replace: true,
        link: function (scope, elem, attrs, controller) {
            scope.position = Number(attrs.ssPosition);
        }
    }
});

(function($) {

    $(document).ready(function () {

        var startPos = $('.slider-tab').data('position');
        setTabPosition(startPos);
        $('.slider-reading').val(startPos + "%");

        var clicked = false;
        var startPoint = {};

        $('.slider-tab').bind('mousedown', function (event) {
            clicked = true;
            startPoint.x = event.clientX;
            startPoint.y = event.clientY
            $('.slider-clicked').val('clicked');
        });

        $(document).bind('mouseup', function () {
            clicked = false;
            $('.slider-clicked').val('not clicked');
        });

        $(document).bind('mousemove', function (event) {
            if (clicked) {
                var distanceX = event.clientX - startPoint.x;
                var distanceY = event.clientY - startPoint.y;
                var oldLeft = $('.slider-tab').css('left').replace('px', '');
                var newLeft = Number(oldLeft) + distanceX;
                newLeft = newLeft < 0 ? 0 : newLeft;
                var tabWidth = $('.slider-tab').width();
                var parentWidth = $('.slider').width();
                if (newLeft > parentWidth - tabWidth) {
                    newLeft = parentWidth - tabWidth;
                }
                var slideWidth = parentWidth - tabWidth;
                var percentage = getTabPosition();
                $('.slider-tab').data('position', percentage);
                $('.slider-reading').val(percentage + "%");
                $('.slider-tab').css('left', newLeft + "px");
                startPoint.x = event.clientX;
                startPoint.y = event.clientY;
            }
        });
    });

    function setTabPosition(percentage) {
        var tabWidth = $('.slider-tab').width();
        var parentWidth = $('.slider').width();
        var slideWidth = parentWidth - tabWidth;
        var newLeft = slideWidth * percentage / 100;
        $('.slider-tab').css('left', newLeft + "px");
    }

    function getTabPosition() {
        var left = $('.slider-tab').css('left').replace('px', '');
        var tabWidth = $('.slider-tab').width();
        var parentWidth = $('.slider').width();
        var slideWidth = parentWidth - tabWidth;
        var percentage = Math.floor(left / slideWidth * 100);
        return percentage;
    }

})(jQuery);