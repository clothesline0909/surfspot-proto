describe('SsSlider', function () {
    beforeEach(function () {
        module('SurfSpot');
        module('templates/directives/ssSlider.html');
    });

    var $compile,
        $rootScope,
        scope,
        slider,
        sliderWidth,
        tab,
        tabWidth,
        left;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        slider = create();
        angular.element(document).find('body').append(slider);
        slider.isolateScope().renderSlider();
        sliderWidth = slider.width();
        tab = slider.find('.slider-tab');
        tabWidth = tab.width();
        left = Number(tab.css('left').replace('px', ''));
    }));

    afterEach(function () {
        slider.remove();
    });

    function create() {
        var slider, compiledslider;
        slider = angular.element('<ss-slider position="40"></ss-slider>');
        compiledslider = $compile(slider)(scope);
        scope.$digest();
        return compiledslider;
    }

    describe(".renderSlider", function () {
        it("should render the slider tab at 40% of the length", function () {
            var percentage = left / (sliderWidth - tabWidth) * 100;
            expect(percentage).toBe(40);
        });
    });

    describe(".getNewPosition", function () {

        it("should give new position as 50", function () {
            var distanceX = 0.1 * (sliderWidth - tabWidth);
            expect(slider.isolateScope().getNewPosition(distanceX)).toBe(50);
        });

        it("should give new position as 30", function () {
            var distanceX = -0.1 * (sliderWidth - tabWidth);
            expect(slider.isolateScope().getNewPosition(distanceX)).toBe(30);
        });

        it("should give new position as 40", function () {
            var distanceX = 0.7 * (sliderWidth - tabWidth);
            expect(slider.isolateScope().getNewPosition(distanceX)).toBe(40);
        });

        it("should give new position as 40", function () {
            var distanceX = -0.5 * (sliderWidth - tabWidth);
            expect(slider.isolateScope().getNewPosition(distanceX)).toBe(40);
        });
    });

    it("should replace the slider with the appropriate content", function () {
        expect(slider.html()).toContain('<div class="slider-bar">');
    });

    it("should set the position to 40", function () {
        expect(slider.isolateScope().position).toBe(40);
    });

    it("should begin as un-clicked", function () {
        expect(slider.isolateScope().clicked).toBe(false);
    });

    it("should be clicked when a mousedown event occurs on the slider tab", function () {
        var tab = slider.find('.slider-tab');
        tab.trigger('mousedown');
        expect(slider.isolateScope().clicked).toBe(true);
    });

    it("should be not clicked when a mouseup event occurs on the document", function () {
        slider.isolateScope().clicked = true;
        expect(slider.isolateScope().clicked).toBe(true);
        $(document).trigger('mouseup');
        expect(slider.isolateScope().clicked).toBe(false);
    });

    it("should give position 40 when mouse is dragged without click", function () {
        var event = $.Event('mousemove');
        event.clientX = 0.3 * (sliderWidth - tabWidth);
        tab.trigger(event);
        expect(slider.isolateScope().position).toBe(40);
    });

    it("should give position 70 when mouse is dragged with click", function () {
        var event = $.Event('mousedown');
        startX = tab.offset().left + tab.width() / 2;
        event.clientX = startX;
        tab.trigger(event);
        event = $.Event('mousemove');
        event.clientX = startX + 0.3 * (sliderWidth - tabWidth);
        tab.trigger(event);
        expect(slider.isolateScope().position).toBe(70);
    });

    it("should have the class 'clicked' if clicked", function () {
        tab.trigger('mousedown');
        expect(tab.hasClass('clicked')).toBe(true);
    });
    
});