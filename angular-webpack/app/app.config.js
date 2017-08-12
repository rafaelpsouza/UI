config.$inject = ['$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider'];

export default function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
  $urlRouterProvider.otherwise('/');

  var page1State = {
    name: 'page1',
    url: '/page1',
    template: require('./page1.html')
  }

  var page2State = {
    name: 'page2',
    url: '/page2',
    template: require('./page2.html')
  }

  $stateProvider.state(page1State);
  $stateProvider.state(page2State);
}