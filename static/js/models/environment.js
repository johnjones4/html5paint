define(['../vendor/backbone','./painting','./color'],function(Backbone,Painting,Color) {
	return Backbone.Model.extend({
		defaults: {
			painting: new Painting(),
			canvas: null,
			strokeColor: null,
			fillColor: null,
			lineWidth: 3,
			tool: null
		},
		initialize: function(){
			this.on("change:tool", function(model) {
				console.log('Tool changed to ' + model.get('tool').get('name'));
			});
			this.on("change:fillColor change:strokeColor",function(model) {
				if (model.get('strokeColor') && model.get('tool')) {
					model.get('tool').set({
						strokeColor: model.get('strokeColor').get('color')
					});
				}
				if (model.get('fillColor') && model.get('tool')) {
					model.get('tool').set({
						strokeColor: model.get('fillColor').get('color')
					});
				}
				console.log('Color changed');
			})
		}
	});
});