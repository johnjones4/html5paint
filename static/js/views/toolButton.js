define(['../vendor/jquery','../vendor/backbone','../vendor/underscore'],function($,Backbone,_) {
	return Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
			this.render();
			var _this = this;
			if (this.model) {
				this.model.on('change:attached',function(model) {
					if (model.get('attached')) {
						_this.$el.find('a').addClass('active');
					} else {
						_this.$el.find('a').removeClass('active');
					}
				})
			}
		},
		render: function(){
            var variables = {
            	'name': this.model ? this.model.get('name') : 'not-implmented',
            	'classname': this.model ? this.model.get('namespace') : 'not-implemented'
            };
            var template = _.template( $("#template_tool_button").html(), variables);
            this.$el.html( template );
		},
		events:  {
			'click a': 'attachTool'
		},
		attachTool: function(event) {
			if (event.preventDefault) event.preventDefault();
			if (this.model)
				this.model.attach();
			else
				alert('Not Implemented!');
			return false;
		}
	});
});