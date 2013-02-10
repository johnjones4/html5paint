define(['../../vendor/backbone','../../vendor/jquery','../color'],function(Backbone,$,Color) {
	Backbone.Model.prototype._super = function(funcName){
		return this.constructor.__super__[funcName].apply(this, _.rest(arguments));
	}
	return Backbone.Model.extend({
		defaults: {
			namespace: 'tool',
			canvas: null,
			painting: null,
			strokeColor: new Color({red:0,green:0,blue:0,alpha:255}),
			fillColor: new Color({red:0,green:0,blue:255,alpha:255}),
			down: false
		},
		initialize: function() {

		},
		attach: function(painting,canvas) {
			var _this = this;
			_this.set({
				canvas: canvas,
				painting: painting
			});
			$(canvas).on('mousedown',function(event) {
				var point = _this.translateXYForEvent(event);
				_this.mouseDown(event,point);
			})
			.on('mouseup',function(event) {
				var point = _this.translateXYForEvent(event);
				_this.mouseUp(event,point);
			}).on('mousemove',function(event) {
				var point = _this.translateXYForEvent(event);
				_this.mouseMove(event,point);
			});
		},
		detach: function() {
			$(this.get('canvas')).off('mousedown mouseup mousemove');
			this.set({
				canvas: null,
				painting: null
			});
		},
		translateXYForEvent: function(event) {
			var x = event.pageX;
			var y = event.pageY;
			var offsetX = $(this.get('canvas')).offset().top;
			var offsetY = $(this.get('canvas')).offset().left;
			return {
				x: Math.floor(x-offsetX),
				y: Math.floor(y-offsetY)
			};
		},
		mouseDown: function(event,point) {
			var context = this.get('canvas').getContext("2d");
			if (this.get('strokeColor')) context.strokeStyle = this.get('strokeColor').cssColor();
			if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();
			this.set({
				down: true
			});
		},
		mouseUp: function(event,point) {
			this.set({
				down: false
			});
		},
		mouseMove: function(event,point) {}
	});
});