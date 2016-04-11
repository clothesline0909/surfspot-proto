describe('SsSlider', function () {
    beforeEach(function () {
        module('SurfSpot');
        module('templates/directives/ssSlider.html');
    });

    var $compile,
        $rootScope,
        scope,
        element;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
        element = create();
    }));

    function create() {
        var element, compiledElement;
        element = angular.element('<ss-slider position="40"></ss-slider>');
        compiledElement = $compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }

    it("should replace the element with the appropriate content", function () {
        expect(element.html()).toContain('<div class="slider-bar">');
    });

    it("should set the position to 40", function () {
        expect(element.isolateScope().position).toBe(40);
    });

    it("should render the slider tab at 40% of the length", function () {
        angular.element(document).find('body').append(element);
        var tab = element.find('.slider-tab');
        var left = Number(tab.css('left').replace('px', ''));
        var parentWidth = element.width();
        var tabWidth = tab.width();
        var percentage = left / (parentWidth - tabWidth) * 100;
        expect(percentage).toBe(40);
    });

    it("should begin as un-clicked", function () {
        expect(element.isolateScope().clicked).toBe(false);
    });

    it("should be clicked when a mousedown event occurs on the slider tab", function () {
        var tab = element.find('.slider-tab');
        tab.trigger('mousedown');
        expect(element.isolateScope().clicked).toBe(true);
    });

    it("should be not clicked when a mouseup event occurs on the document", function () {
        element.isolateScope().clicked = true;
        expect(element.isolateScope().clicked).toBe(true);
        var tab = element.find('.slider-tab');
        $(document).trigger('mouseup');
        expect(element.isolateScope().clicked).toBe(false);
    });

    it("should modify 'position' in response to user dragging slider", function () {
        pending('');
    });
    
});