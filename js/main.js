requirejs.config({
	baseUrl: 'js',
	shim: {
		'vendor/backbone': {
			deps: ['vendor/underscore'],
			exports: 'Backbone'
		},
		'vendor/underscore': {
			exports: '_'
		}
	}
});

requirejs(['vendor/backbone','models/painting','modesl/color'],
function(Backbone,Painting,Color) {

});


var element = document.getElementById("canvas");
var c = element.getContext("2d");

var painting = new Painting({context:c});

var color = new Color({red:0,green:0,blue:255,alpha:255});

for(var i=0;i<100;i++)
	painting.setPixel(i,i,color);