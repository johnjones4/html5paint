define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'rectangle',
			name: 'Rectangle',
			downPoint: null,
			width: 1,
			strokeColor: null,
			fillColor: null
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
			this.get('painting').displayInContext(context);
			if (this.get('fillColor')) {
				context.fillRect(down.x,down.y,point.x-down.x,point.y-down.y);
			}
			context.strokeRect(down.x,down.y,point.x-down.x,point.y-down.y);
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
				context.strokeRect(down.x,down.y,point.x-down.x,point.y-down.y);
			}
		}
	});
});