define(['../vendor/backbone','../vendor/underscore'],function(Backbone,_) {
	return Backbone.View.extend({
		tagName: 'ul',
		className: 'menu',
		initialize: function(){
			this.render();
		},
		render: function(){
		}
	});
});