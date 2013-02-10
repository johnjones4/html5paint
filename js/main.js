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

requirejs(['models/painting','models/color','models/tools/ellipse','vendor/jquery'],
function(Painting,Color,Ellipse,$) {
	var element = document.getElementById("canvas");
	var c = element.getContext("2d");

	var painting = new Painting();
	var pencil = new Ellipse({strokeColor: new Color({red:0,green:0,blue:0,alpha:255}),
			fillColor: new Color({red:0,green:0,blue:255,alpha:255})});
	pencil.attach(painting,canvas);
});