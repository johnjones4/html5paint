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

requirejs(['vendor/jquery','models/environment','views/canvas','utilities/toolFactory','views/toolButton'],
function($,Environment,Canvas,ToolFactory,ToolButton) {
	var environment = new Environment();
	var canvas = new Canvas({
		model: environment,
		el: $('#canvas_viewport')
	});

	for(var tool in ToolFactory) {
		var $item = $('<li></li>');
		$('#toolbar').append($item);
		new ToolButton({
			el: $item,
			model: ToolFactory[tool]({
				environment: environment
			})
		});
	}
});