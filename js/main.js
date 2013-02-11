requirejs.config({
	baseUrl: 'js',
	shim: {
		'vendor/backbone': {
			deps: ['vendor/underscore','vendor/jquery'],
			exports: 'Backbone'
		},
		'vendor/underscore': {
			exports: '_'
		},
		'vendor/jquery': {
			exports: '$'
		}
	}
});

requirejs(['vendor/jquery','models/environment','views/canvas','utilities/toolFactory'],
function($,Environment,Canvas,ToolFactory) {
	var environment = new Environment();
	var canvas = new Canvas({
		model: environment,
		el: $('#canvas_viewport')
	});
	ToolFactory.generateToolButtons(environment);
});