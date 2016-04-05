describe('SsSlider', function () {
    var $compile,
        $rootScope;

    beforeEach(module('myApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope;
    }));

    it('replaces the element with the appropriate content', function () {
        var element = $compile("<ss-slider ss-position='20'></ss-slider>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("<div class='slider'>");
    });
});