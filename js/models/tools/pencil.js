define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'pencil',
			lastPoint: null,
			pathPoints: [],
			width: 1,
			strokeColor: new Color({red:0,green:0,blue:0,alpha:255}),
			fillColor: new Color({red:0,green:0,blue:255,alpha:255})
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			this.set({
				lastPoint: point
			});

			this.get('painting').setPixel(point.x,point.y,this.get('strokeColor'));

			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);
			context.lineWidth = this.get('width');
			context.lineCap = 'round';
			context.lineJoin = 'round';
			if (this.get('strokeColor')) context.strokeStyle = this.get('strokeColor').cssColor();
			if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			
			var context = this.get('canvas').getContext("2d");

			if (this.get('fillColor') && this.get('pathPoints').length > 1) {
				this.get('painting').displayInContext(context);
				var points = this.get('pathPoints');
				context.beginPath();
				context.moveTo(points[0].x,points[0].y);
				for(var i=0;i<points.length;i++) {
					var point = points[i];
					context.lineTo(point.x,point.y);
				}
				context.closePath();
				context.stroke();
				context.fill();
			}
			this.get('painting').copyFromContext(context);
			
			this.set({
				lastPoint: null,
				pathPoints: []
			});
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
				} else {
					this.get('painting').setPixel(point.x,point.y,this.get('color'));
				}
				this.set({lastPoint:point});
			}
		}
	});
});