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
            	'color': this.model ? this.model.get('color').cssColor() : 'not-implmented'
            };
            var template = _.template( $("#template_color_button").html(), variables);
            this.$el.html(template);
            this.$el.find('a').css({background: this.model.get('color').cssColor()});
		},
		events:  {
			'click a': 'attachColor'
		},
		attachColor: function(event) {
			if (event.preventDefault) event.preventDefault();
			if (this.model)
				this.model.attach(true);
			else
				alert('Not Implemented!');
			return false;
		}
	});
});