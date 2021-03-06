define(['../../vendor/backbone','./tool',],function(Backbone,Tool) {
	return Tool.extend({
		defaults: {
			namespace: 'ellipse',
			name: 'Ellipse',
			downPoint: null,
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
				downPoint: point,
				lastPoint: null
			});

			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);
			context.lineWidth = this.get('width');
			context.lineCap = 'square';
			context.lineJoin = 'square';
			if (this.get('strokeColor')) context.strokeStyle = this.get('strokeColor').cssColor();
			if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			this.set({lastPoint: point});
			this.end();
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down') && this.get('downPoint')) {
				var down = this.get('downPoint');
				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);
				this.drawAtPoints(context,down,point);
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			var point = this.get('lastPoint');

			if (point) {
				var down = this.get('downPoint');
				this.get('painting').displayInContext(context);
				this.drawAtPoints(context,down,point);
				this.get('painting').copyFromContext(context);
			}
				
			this.set({
				lastPoint: null,
				downPoint: null
			});
		},
		drawAtPoints: function(context,pointA,pointB) {
			var centerX = pointA.x + (pointB.x-pointA.x)/2;
			var centerY = pointA.y + (pointB.y-pointA.y)/2;
			var width = pointB.x-pointA.x;
			var height = pointB.y-pointA.y;
			context.beginPath();
			context.moveTo(centerX, centerY - height/2); // A1
			context.bezierCurveTo(
				centerX + width/2, centerY - height/2, // C1
				centerX + width/2, centerY + height/2, // C2
				centerX, centerY + height/2); // A2
			context.bezierCurveTo(
				centerX - width/2, centerY + height/2, // C3
				centerX - width/2, centerY - height/2, // C4
				centerX, centerY - height/2); // A1
			context.closePath();
			context.stroke();
			if (this.get('fillColor') && !this.get('ignoreFill')) {
				context.fill();
			}
		}
	});
});