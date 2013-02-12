define(['../vendor/jquery','../vendor/backbone','../vendor/underscore','../utilities/toolFactory','./toolButton'],function($,Backbone,_,ToolFactory,ToolButton) {
	return Backbone.View.extend({
		tagName: 'ul',
		className: 'toolbar',
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.empty();
            for(var tool in ToolFactory) {
				var toolObject = ToolFactory[tool]({environment: this.model});
				this.$el.append(new ToolButton({model: toolObject}).$el);
				if (toolObject == null) console.log(tool+' not implemented!');
			}
		}
	});
});