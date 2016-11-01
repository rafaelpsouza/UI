(function () {
    var app = angular.module("catalog", ["ngRoute", "movies"]);
    
    app.config(['$locationProvider', function ($locationProvider) {
        //$locationProvider.html5Mode(true);
    }]);

    app.config(function ($routeProvider) {
        $routeProvider
                .when("/", {
                    templateUrl: "movie/movies.html"
                })
                .when("/page1", {
                    templateUrl: "page1.html"
                })
                .when("/page2", {
                    templateUrl: "page2.html"
                });

    });
    
})();