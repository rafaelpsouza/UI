(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('displayText', displayText);

    function displayText() {
        var directive = {
            restrict: 'EA',
            template: 'Display Text Here!'
        };

        return directive;
    }
}());