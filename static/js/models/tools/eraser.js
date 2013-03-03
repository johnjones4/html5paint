define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'erase',
			name: 'Eraser',
			lastPoint: null,
			pathPoints: [],
			width: 1,
			selective: false
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			this.set({
				lastPoint: point
			});

			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);
			context.lineWidth = this.get('width');
			context.lineCap = 'round';
			context.lineJoin = 'round';
			context.strokeStyle = '#fff';
			if (this.get('selective')) {
				context.globalAlpha = 1.0
				context.globalCompositeOperation = 'xor';
			}
			this.get('painting').setPixel(point.x,point.y,this.get('strokeColor'));
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			this.end();
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down')) {
				if (this.get('lastPoint')) {
					this.get('pathPoints').push(point);
					var lastPoint = this.get('lastPoint');
					var context = this.get('canvas').getContext("2d");
					context.beginPath();
					context.moveTo(lastPoint.x,lastPoint.y);
					context.lineTo(point.x,point.y);
					context.closePath();
					context.stroke();
				}
				this.set({lastPoint:point});
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			this.get('painting').copyFromContext(context);
			this.set({
				lastPoint: null,
				pathPoints: []
			});
			context.globalCompositeOperation = 'source-over';
		}
	});
});