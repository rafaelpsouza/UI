(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('displayAddress', displayAddress);

    function displayAddress() {
        var directive = {
            restrict: 'E',
            transclude: true,
            scope: {
                address: '@'
            },
            templateUrl: 'app/widgets/templates/display-address.html'
        };
        return directive;
    }
}());