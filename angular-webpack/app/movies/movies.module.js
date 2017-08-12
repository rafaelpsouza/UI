import MoviesController from './movies.controller.js'
import config from './movies.config.js'

export default angular.module("movies", [])
	.controller('MoviesController', MoviesController)
	.config(config)
	.name