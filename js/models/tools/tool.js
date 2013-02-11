define(['../../vendor/backbone','../../vendor/jquery','../color'],function(Backbone,$,Color) {
	Backbone.Model.prototype._super = function(funcName){
		return this.constructor.__super__[funcName].apply(this, _.rest(arguments));
	}
	return Backbone.Model.extend({
		defaults: {
			namespace: 'tool',
			name: 'Tool',
			environment: null,
			down: false,
			width: 1,
			strokeColor: null,
			fillColor: null,
			ignoreFill: false
		},
		initialize: function() {

		},
		attach: function() {
			var _this = this;
			var lastTool = _this.get('environment').get('tool');
			if (lastTool) lastTool.detach();
			_this.get('environment').set({
				tool: _this
			});
			_this.set({
				canvas: this.get('environment').get('canvas'),
				painting: this.get('environment').get('painting'),
				strokeColor: this.get('environment').get('strokeColor'),
				fillColor: this.get('environment').get('fillColor'),
				width: this.get('environment').get('lineWidth')
			});
			$(this.get('canvas')).on('mousedown',function(event) {
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