define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'rectangle',
			name: 'Rectangle',
			downPoint: null,
			width: 1,
			strokeColor: null,
			fillColor: null,
			ignoreFill: false,
			cornerRadius: 10
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
				this.drawRoundedRect(context,down.x,down.y,point.x-down.x,point.y-down.y);
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			var point = this.get('lastPoint');

			if (point) {
				var down = this.get('downPoint');
				this.get('painting').displayInContext(context);
				this.drawRoundedRect(context,down.x,down.y,point.x-down.x,point.y-down.y);
				this.get('painting').copyFromContext(context);
			}
				
			this.set({
				lastPoint: null,
				downPoint: null
			});
		},
		drawRoundedRect: function(context,x,y,width,height) {
			if (width < 0) {
				x = x + width;
				width = Math.abs(width);
			}
			if (height < 0) {
				y = y + height
				height = Math.abs(height);
			}
			
			var radius = this.get('cornerRadius');
			context.beginPath();
			context.moveTo(x + radius, y);
			context.lineTo(x + width - radius, y);
			context.quadraticCurveTo(x + width, y, x + width, y + radius);
			context.lineTo(x + width, y + height - radius);
			context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			context.lineTo(x + radius, y + height);
			context.quadraticCurveTo(x, y + height, x, y + height - radius);
			context.lineTo(x, y + radius);
			context.quadraticCurveTo(x, y, x + radius, y);
			context.closePath();
			context.stroke();
			if (this.get('fillColor') && !this.get('ignoreFill')) {
				context.fill();
			}
		}
	});
});