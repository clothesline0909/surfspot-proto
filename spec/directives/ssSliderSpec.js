describe('SsSlider', function () {
    beforeEach(module('SurfSpot'));

    var $compile,
        $rootScope;

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should replace the element with the appropriate content', function () {
        var element = $compile('<ss-slider ss-position="20"></ss-slider>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain('<div class="slider">');
    });
});