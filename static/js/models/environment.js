define(['../vendor/backbone','./painting','./color','./paletteColor'],function(Backbone,Painting,Color,PaletteColor) {
	return Backbone.Model.extend({
		defaults: {
			painting: new Painting(),
			canvas: null,
			strokeColor: new PaletteColor({color: new Color({red:0,green:0,blue:0,alpha:255})}),
			fillColor: new PaletteColor({color: new Color({red:255,green:255,blue:255,alpha:255})}),
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
						fillColor: model.get('fillColor').get('color')
					});
				}
				console.log('Color changed');
			})
		}
	});
});