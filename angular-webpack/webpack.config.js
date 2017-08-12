const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
  		app: __dirname + '/app/app.module.js',
    	vendor: ['angular', 'angular-ui-router', 'jquery', 'bootstrap/dist/js/bootstrap']
  	},
	output: {	  	
		filename: '[name].js',
	    path: path.resolve(__dirname, 'dist')
	},
	module: {
    	loaders: [
    		{ test: /\.html$/, loader: "raw-loader" }    		
    	]
	},
	plugins: [
		new CopyWebpackPlugin([
    		{ from: 'assets/', to: '' },
    		{ from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'bootstrap.min.css' },
    	]),
    	new webpack.ProvidePlugin({   
        	jQuery: 'jquery',
        	$: 'jquery',
        	jquery: 'jquery'
    	})
	]
};