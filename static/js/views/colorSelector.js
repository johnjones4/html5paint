define(['../vendor/jquery','../vendor/backbone','../vendor/underscore','../utilities/colorFactory','./colorButton'],
	function($,Backbone,_,ColorFactory,ColorButton) {
	return Backbone.View.extend({
		tagName: 'div',
		className: 'colorSelector',
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html('<div class="selected"></div><ul></ul>');
            for(var color in ColorFactory) {
				var paletteColor = ColorFactory[color]({environment: this.model});
				this.$el.find('ul').append(new ColorButton({model: paletteColor}).$el);
			}
		}
	});
});