define(['../vendor/backbone','./painting','./color'],function(Backbone,Painting,Color) {
	return Backbone.Model.extend({
		defaults: {
			painting: new Painting(),
			canvas: null,
			strokeColor: new Color({red:0,green:0,blue:0,alpha:255}),
			fillColor: new Color({red:0,green:0,blue:100,alpha:255}),
			lineWidth: 3,
			tool: null
		},
		initialize: function(){
			this.on("change:tool", function(model) {
				console.log('Tool changed to ' + model.get('tool').get('name'));
			});
		}
	});
});