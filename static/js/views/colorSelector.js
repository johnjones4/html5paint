define(['../vendor/jquery','../vendor/backbone','../vendor/underscore','../utilities/colorFactory','./colorButton'],
	function($,Backbone,_,ColorFactory,ColorButton) {
	return Backbone.View.extend({
		tagName: 'div',
		className: 'colorSelector',
		initialize: function(){
			this.render();
			var _this = this;
			this.model.on("change:fillColor change:strokeColor",function(model) {
				if (model.get('strokeColor')) _this.$el.find('.outer').css({background: model.get('strokeColor').get('color').cssColor()});
				if (model.get('fillColor')) _this.$el.find('.inner').css({background: model.get('fillColor').get('color').cssColor()});
			});
			this.model.trigger('change:fillColor',this.model);
		},
		render: function(){
			this.$el.html('<div class="selected outer"><div class="inner"></div></div><ul></ul>');
            for(var color in ColorFactory) {
				var paletteColor = ColorFactory[color]({environment: this.model});
				this.$el.find('ul').append(new ColorButton({model: paletteColor}).$el);
			}
		}
	});
});