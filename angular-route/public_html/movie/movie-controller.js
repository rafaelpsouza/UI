(function () {
    angular.module("movies", [])
            .controller("MovieController", function () {
                this.movie = {};
                this.movies = [
                    {year: 1972, name: "O Poderoso Chefão", rate: 3},
                    {year: 1994, name: " Um Sonho de Liberdade", rate: 2},
                    {year: 1999, name: "Matrix", rate: 1}
                ];
                this.addMovie = function () {
                    this.movies.push(this.movie);
                    this.movie = {};
                };

                this.range = function (min, max, step) {
                    step = step || 1;
                    var input = [];
                    for (var i = min; i <= max; i += step)
                        input.push(i);
                    return input;
                };
            });
})();