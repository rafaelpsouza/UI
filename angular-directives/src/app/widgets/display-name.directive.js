(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('displayName', displayName);

    function displayName() {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                name: '@',
                surname: '@'
            },
            template: '<div>{{name}} - {{surname}}</div>'
        };
        return directive;
    }
}());