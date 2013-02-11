define(['../vendor/backbone','../vendor/underscore'],function(Backbone,_) {
	return Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
            var variables = {
            	'name': this.model ? this.model.get('name') : 'not-implmented',
            	'classname': this.model ? this.model.get('namespace') : 'not-implmented'
            };
            var template = _.template( $("#template_tool_button").html(), variables);
            this.$el.html( template );
		},
		events:  {
			'click input[type=button]': 'attachTool'
		},
		attachTool: function(event) {
			if (this.model)
				this.model.attach();
			else
				alert('Not Implemented!');
		}
	});
});