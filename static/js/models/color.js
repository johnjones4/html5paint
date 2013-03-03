define(['../vendor/backbone'],function(Backbone) {
	return Backbone.Model.extend({
		defaults: {
			red: 0,
			green: 0,
			blue: 0,
			alpha: 255
		},
		initialize: function(){
			
		},
		cssColor: function() {
			if (this.get('alpha') < 255)
				return 'rgba('+this.get('red')+','+this.get('green')+','+this.get('blue')+','+this.get('alpha')+')';
			else
				return 'rgb('+this.get('red')+','+this.get('green')+','+this.get('blue')+')';
		},
		equalsColor: function(otherColor) {
			return this.cssColor() == otherColor.cssColor();
		}
	});
});