(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('redBox', redBox);

    function redBox() {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {},
            template: '<div style="background-color: red;" ng-transclude></div>'
        };
        return directive;
    }
}());