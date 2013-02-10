define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'rectangle',
			downPoint: null,
			width: 1,
			strokeColor: new Color({red:0,green:0,blue:0,alpha:255}),
			fillColor: new Color({red:0,green:0,blue:255,alpha:255})
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			this.set({
				downPoint: point
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
			
			var context = this.get('canvas').getContext("2d");

			var down = this.get('downPoint');
			var centerX = down.x + (point.x-down.x)/2;
			var centerY = down.y + (point.y-down.y)/2;
			this.drawEllipse(context,centerX,centerY,(point.x-down.x),(point.y-down.y));
			this.get('painting').displayInContext(context);
			if (this.get('fillColor')) {
				context.fill();
			}
			context.stroke();
			this.get('painting').copyFromContext(context);
			
			this.set({
				lastPoint: null,
				pathPoints: []
			});
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down') && this.get('downPoint')) {
				var down = this.get('downPoint');
				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);

				var centerX = down.x + (point.x-down.x)/2;
				var centerY = down.y + (point.y-down.y)/2;
				this.drawEllipse(context,centerX,centerY,(point.x-down.x),(point.y-down.y));
				context.stroke();
			}
		},
		drawEllipse: function (context, centerX, centerY, width, height) {
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
		}
	});
});