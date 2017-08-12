import angular from 'angular'
import uirouter from 'angular-ui-router'
import movies from './movies/movies.module.js'
import config from './app.config.js'


angular.module("app", [uirouter, movies]).config(config);