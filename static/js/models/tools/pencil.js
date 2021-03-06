define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'pencil',
			name: 'Pencil',
			lastPoint: null,
			pathPoints: [],
			width: 1,
			strokeColor: null,
			fillColor: null,
			ignoreFill: false
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
			if (this.get('strokeColor')) context.strokeStyle = this.get('strokeColor').cssColor();
			if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();

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

			if (this.get('fillColor') && this.get('pathPoints').length > 1 && !this.get('ignoreFill')) {
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
		}
	});
});