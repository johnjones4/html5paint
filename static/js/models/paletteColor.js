define(['../vendor/backbone'],function(Backbone) {
	return Backbone.Model.extend({
		defaults: {
			color: null,
			environment: null,
			attached: false
		},
		initialize: function(){
			
		},
		attach: function(foreground) {
			this.set({
				attached: true
			});
			var lastColor = this.get('environment').get('fillColor');
			if (lastColor) lastColor.detach();
			this.get('environment').set({
				fillColor: this
			});
		},
		detach: function() {
			this.set({
				attached: false
			});
		}
	});
});