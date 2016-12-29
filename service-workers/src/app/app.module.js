(function () {
  'use strict';

  angular
    .module('app', [])
    .controller('AppController', AppController);

  AppController.$inject = ['$http'];

  function AppController($http){
    var vm = this;
    vm.albums = [];
    
    vm.search = function(term) {
    	$http.get('https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term='+term+'&entity=album')
    	.then(function(resp){
    		vm.albums = resp.data.results;
    		console.debug(resp.data.results);
        });
    };
  }

}());