define(['../../vendor/backbone','./tool',],function(Backbone,Tool) {
	return Tool.extend({
		defaults: {
			namespace: 'bezier-line',
			name: 'Bezier Line',
			downPoint: null,
			width: 1,
			strokeColor: null,
			fillColor: null,
			ignoreFill: false,
			points: []
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			if (this.get('points').length == 0) {
				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);
				context.lineWidth = this.get('width');
				context.lineCap = 'square';
				context.lineJoin = 'square';
				if (this.get('strokeColor')) context.strokeStyle = this.get('strokeColor').cssColor();
				if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();
			}

			this.get('points').push(point);
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);
			this.drawPath(context,point);
			if (this.get('points').length == 1) {
				this.get('points').push(point);
			} else if (this.get('points').length == 4) {
				this.end();
			}
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down') && this.get('points').length == 1) {
				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);
				this.drawPath(context,point);
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			this.get('painting').copyFromContext(context);
			this.set({
				points:[]
			});
		},
		drawPath: function(context,point) {
			var points = this.get('points');

			context.beginPath();
			context.moveTo(points[0].x,points[0].y);
			if (points.length == 1) {
				context.lineTo(point.x,point.y);
			} else if (points.length == 2) {
				context.lineTo(points[1].x,points[1].y);
			} else if (points.length == 3) {
				context.quadraticCurveTo(points[2].x,points[2].y,points[1].x,points[1].y)
			} else if (points.length == 4) {
				context.bezierCurveTo(points[3].x,points[3].y,points[2].x,points[2].y,points[1].x,points[1].y)
			}
			context.stroke();
		}
	});
});