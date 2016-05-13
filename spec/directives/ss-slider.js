describe('ssSlider', function () {
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

    describe("creation", function () {
        it("should replace the slider with the appropriate content", function () {
            expect(slider.html()).toContain('<div class="slider-bar">');
        });

        it("should set the position to 40", function () {
            expect(slider.isolateScope().position).toBe(40);
        });

        it("should begin as un-clicked", function () {
            expect(slider.isolateScope().clicked).toBe(false);
        });
    });

    
    describe("tab event", function () {
        describe("mousedown", function () {
            it("should set scope.clicked to true", function () {
                var tab = slider.find('.slider-tab');
                tab.trigger('mousedown');
                expect(slider.isolateScope().clicked).toBe(true);
            });

            it("should apply a class of 'clicked' to the tab", function () {
                tab.trigger('mousedown');
                expect(tab.hasClass('clicked')).toBe(true);
            });
        });

        describe("touchstart", function () {
            it("should set scope.clicked to true", function () {
                var tab = slider.find('.slider-tab');
                tab.trigger('touchstart');
                expect(slider.isolateScope().clicked).toBe(true);
            });

            it("should apply a class of 'clicked' to the tab", function () {
                tab.trigger('touchstart');
                expect(tab.hasClass('clicked')).toBe(true);
            });
        });

        describe("mousemove", function () {
            it("should not change scope.position if tab hasn't been clicked", function () {
                var event = $.Event('mousemove');
                event.clientX = 0.3 * (sliderWidth - tabWidth);
                tab.trigger(event);
                expect(slider.isolateScope().position).toBe(40);
            });

            it("should change scope.position when tab has been clicked", function () {
                var event = $.Event('mousedown');
                startX = tab.offset().left + tab.width() / 2;
                event.clientX = startX;
                tab.trigger(event);
                event = $.Event('mousemove');
                event.clientX = startX + 0.3 * (sliderWidth - tabWidth);
                tab.trigger(event);
                expect(slider.isolateScope().position).toBe(70);
            })
        });

        describe("touchmove", function () {
            it("should not change scope.position if tab hasn't been touched", function () {
                var event = $.Event('touchmove');
                event.clientX = 0.3 * (sliderWidth - tabWidth);
                tab.trigger(event);
                expect(slider.isolateScope().position).toBe(40);
            });

            it("should change scope.position when tab has been touched", function () {
                var event = $.Event('touchstart');
                startX = tab.offset().left + tab.width() / 2;
                event.clientX = startX;
                tab.trigger(event);
                event = $.Event('touchmove');
                event.clientX = startX + 0.3 * (sliderWidth - tabWidth);
                tab.trigger(event);
                expect(slider.isolateScope().position).toBe(70);
            })
        });

        describe("mouseup", function () {
            it("should set scope.clicked to false", function () {
                slider.isolateScope().clicked = true;
                $(document).trigger('mouseup');
                expect(slider.isolateScope().clicked).toBe(false);
            });
        });

        describe("touchend", function () {
            it("should set scope.clicked to false", function () {
                slider.isolateScope().clicked = true;
                $(document).trigger('touchend');
                expect(slider.isolateScope().clicked).toBe(false);
            });
        });
    });
});