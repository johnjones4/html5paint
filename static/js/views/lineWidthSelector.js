define(['../vendor/jquery','../vendor/backbone','../vendor/underscore'],
	function($,Backbone,_) {
	var selectable = [
		{
			translate: 0,
			min: 0,
			max: 4,
			width: 1
		},
		{
			translate: 7,
			min: 4,
			max: 11,
			width: 2
		},
		{
			translate: 15,
			min: 11,
			max: 19,
			width: 3
		},
		{
			translate: 24,
			min: 19,
			max: 29,
			width: 5
		},
		{
			translate: 33,
			min: 29,
			max: 39,
			width: 6
		},
		{
			translate: 45,
			min: 39,
			max: 52,
			width: 8
		},
		{
			translate: 60,
			min: 52,
			max: 68,
			width: 11
		},
		{
			translate: 76,
			min: 68,
			max: 84,
			width: 14
		},
	];
	return Backbone.View.extend({
		tagName: 'div',
		className: 'lineWidthSelector',
		initialize: function(){
			this.render();
			var _this = this;
			this.$el.click(function(event) {
				var offset = event.pageY - _this.$el.offset().top - 9;
				_.some(selectable,function(item) {
					if (offset >= item.min && offset < item.max) {
						var translate = 'translate(0,'+item.translate+'px)';
						_this.$el.find('.arrow').css({
							'transform': translate,
							'-webkit-transform': '-webkit-'+translate,
							'-moz-transform': '-moz-'+translate
						});
						_this.model.set({lineWidth:item.width});
						return true;
					}
					return false;
				});
			})
		},
		render: function(){
			this.$el.html($('#template_line_selector').html());
		}
	});
});