(function () {
  'use strict';

  angular
    .module('main', ['app.widgets'])
    .controller('MainController', MainController);

  MainController.$inject = [];

  function MainController(){
    var vm = this;
    vm.title = 'Sample Title';
  }

}());