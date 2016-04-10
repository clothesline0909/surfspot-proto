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
        element = $compile('<ss-slider position="40"></ss-slider>')(scope);
        scope.$digest();
    }));

    it('should replace the element with the appropriate content', function () {
        expect(element.html()).toContain('<div class="slider">');
    });

    it('should watch for changes in the model', function () {
        pending('');
    });

    it('should set the position to 40', function () {
        expect(element.isolateScope().position).toBe(40);
    });
});