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

requirejs(['vendor/jquery','models/environment','views/canvas','views/toolBar','views/menu','views/colorSelector','views/lineWidthSelector'],
function($,Environment,Canvas,ToolBar,Menu,ColorSelector,LineWidthSelector) {
	var environment = new Environment();

	$('#primary')
		.append(new Menu({model:environment}).$el)
		.append(new ToolBar({model:environment}).$el)
		.append(new Canvas({model: environment}).$el)
		.append(new ColorSelector({model: environment}).$el)
		.append(new LineWidthSelector({model: environment}).$el);
});