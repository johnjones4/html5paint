define(['../vendor/backbone','../vendor/underscore'],function(Backbone,_) {
	return Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
            var variables = {
            	'name': this.model.get('name'),
            	'classname': this.model.get('namespace')
            };
            var template = _.template( $("#template_tool_button").html(), variables);
            this.$el.html( template );
		},
		events:  {
			'click input[type=button]': 'attachTool'
		},
		attachTool: function(event) {
			this.model.attach();
		}
	});
});