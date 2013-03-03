define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'freehand-select',
			name: 'Freehand Select',
			points: [],
			downPoint1: null,
			dragPoint: null,
			mode: 'drawing'
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			if (this.get('mode') == 'drawing') {
				this.set({
					points: [],
					downPoint1: null,
					dragPoint: null
				});

				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);
				context.lineWidth = 1;
				context.lineCap = 'square';
				context.lineJoin = 'square';
				context.strokeStyle = '#000';
				if (context.setLineDash) context.setLineDash(4);

				this.get('points').push(point);
			} else if (this.get('mode') == 'moving') {
				this.set({downPoint1: point});
			}
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			if (this.get('mode') == 'drawing') {
				var context = this.get('canvas').getContext("2d");
				this.drawPath(context,{x:0,y:0},true);
				this.set({
					mode: 'moving'
				});
			} else if (this.get('mode') == 'moving') {
				this.end();
			}
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down')) {
				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);
				if (this.get('mode') == 'drawing') {
					this.get('points').push(point);
				}
				this.drawPath(context,{x:0,y:0},this.get('mode') == 'moving');
				if (this.get('mode') == 'moving') {
					this.set({dragPoint: point});
					if (this.get('downPoint1')) {
						var deltaX = point.x - this.get('downPoint1').x;
						var deltaY = point.y - this.get('downPoint1').y;
						this.drawPath(context,{x:deltaX,y:deltaY},true);
					}
				}
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);
			this.redrawTranslated(context);
			this.set({
				points: [],
				downPoint1: null,
				dragPoint: null,
				mode: 'drawing'
			});
		},
		drawPath: function(context,translate,close) {
			var points = this.get('points');
			if (points && points.length > 0) {
				context.beginPath();
				context.moveTo(points[0].x+translate.x,points[0].y+translate.y);
				_.each(points,function(point) {
					context.lineTo(point.x+translate.x,point.y+translate.y);
				});
				if (close) context.closePath();
				context.stroke();
			}
		},
		redrawTranslated: function(context) {
			if (this.get('points') && this.get('downPoint1') && this.get('dragPoint')) {
				var points = this.get('points');

				var minMax = (function() {
					var minMax = {
						x: {
							min: 1000,
							max: 0
						},
						y: {
							min: 1000,
							max: 0
						}
					}
					_.each(points,function(point) {
						if (point.x > minMax.x.max) 
							minMax.x.max = point.x;
						if (point.x < minMax.x.min) 
							minMax.x.min = point.x;
						if (point.y > minMax.y.max) 
							minMax.y.max = point.y;
						if (point.y < minMax.y.min) 
							minMax.y.min = point.y;
					});
					return minMax;
				}());

				var inputArray = [];

				context.beginPath();
				context.moveTo(points[0].x,points[0].y);
				_.each(points,function(point) {
					context.lineTo(point.x,point.y);
				});
				context.closePath();

				for(var y = minMax.y.min; y <= minMax.y.max; y++) {
					for(var x = minMax.x.min; x <= minMax.x.max; x++) {
						if (context.isPointInPath(x,y)) {
							inputArray.push(this.get('painting').getPixel(x,y));
							this.get('painting').setPixel(x,y,new Color({
								red: 255,
								green: 355,
								blue: 255
							}));
						} else {
							inputArray.push(false);
						}
					}
				}

				var n = 0;
				var deltaX = this.get('dragPoint').x - this.get('downPoint1').x;
				var deltaY = this.get('dragPoint').y - this.get('downPoint1').y;
				for(var y = minMax.y.min; y <= minMax.y.max; y++) {
					for(var x = minMax.x.min; x <= minMax.x.max; x++) {
						var pixel = inputArray[n];
						if (pixel != false) {
							this.get('painting').setPixel(x+deltaX,y+deltaY,pixel);
						}
						n++;
					}
				}
				this.get('painting').displayInContext(context);
			}
		}
	});
});