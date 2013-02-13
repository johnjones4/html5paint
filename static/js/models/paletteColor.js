define(['../vendor/backbone'],function(Backbone) {
	return Backbone.Model.extend({
		defaults: {
			color: null,
			environment: null,
			attached: false
		},
		initialize: function(){
			
		},
		attach: function(stroke) {
			this.set({
				attached: true
			});
			if (stroke) {
				var lastColor = this.get('environment').get('strokeColor');
				if (lastColor) lastColor.detach();
				this.get('environment').set({
					strokeColor: this
				});
			} else {
				var lastColor = this.get('environment').get('fillColor');
				if (lastColor) lastColor.detach();
				this.get('environment').set({
					fillColor: this
				});
			}
		},
		detach: function() {
			this.set({
				attached: false
			});
		}
	});
});