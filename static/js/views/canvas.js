define(['../vendor/backbone','../vendor/underscore'],function(Backbone,_) {
	return Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
                  var variables = {
                        'htmlID': 'canvas_'+_.random(0,100),
                        'width': this.model.get('painting').get('width'),
                        'height': this.model.get('painting').get('height'),
                  };
                  var template = _.template( $("#template_canvas").html(), variables);
                  this.$el.html(template);
                  this.model.set({
                        canvas: this
                  });
		},
            setBusy: function(busy) {
                  if (busy) {
                        this.$el.find('canvas').addClass('busy');
                  } else {
                        this.$el.find('canvas').removeClass('busy');
                  }
            }
	});
});