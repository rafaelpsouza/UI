config.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

export default function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  var moviesState = {
    name: 'movies',
    url: '/movies',
    template: require('./movies.html')
  }

   var moviesDefaultState = {
    name: 'moviesDefault',
    url: '/',
    template: require('./movies.html')
  }

  $stateProvider.state(moviesDefaultState);
  $stateProvider.state(moviesState);
}