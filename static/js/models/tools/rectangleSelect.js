define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'rectangle-select',
			name: 'Rectangle Select',
			downPoint: null,
			lastPoint: null,
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
					downPoint: point,
					lastPoint: null,
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
			} else if (this.get('mode') == 'moving') {
				this.set({downPoint1: point});
			}
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			if (this.get('mode') == 'drawing') {
				this.set({lastPoint: point});
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
					this.set({lastPoint: point});
				}
				if (this.get('downPoint')) {
					this.drawAtPoints(context,this.get('downPoint'),point);
				}
				if (this.get('mode') == 'moving') {
					this.get('painting').displayInContext(context);
					this.set({dragPoint: point});
					if (this.get('downPoint') && this.get('lastPoint')) {
						var pointA = this.get('downPoint');
						var pointB = this.get('lastPoint');

						this.drawAtPoints(context,pointA,pointB);

						this.set({dragPoint: point});

						if (this.get('downPoint1')) {
							var deltaX = point.x - this.get('downPoint1').x;
							var deltaY = point.y - this.get('downPoint1').y;

							var pointA1 = {
								x: pointA.x + deltaX,
								y: pointA.y + deltaY
							};
							var pointB1 = {
								x: pointB.x + deltaX,
								y: pointB.y + deltaY
							};

							this.drawAtPoints(context,pointA1,pointB1);
						}
					}
				}
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);
			this.redrawTranslated(context);
			this.set({
				lastPoint: null,
				downPoint: null,
				downPoint1: null,
				dragPoint: null,
				mode: 'drawing'
			});
		},
		drawAtPoints: function(context,pointA,pointB) {
			context.strokeRect(pointA.x,pointA.y,pointB.x-pointA.x,pointB.y-pointA.y);
		},
		redrawTranslated: function(context) {
			if (this.get('downPoint') && this.get('lastPoint') && this.get('dragPoint') && this.get('downPoint1')) {
				var inputArray = [];
				var pointA = this.get('downPoint');
				var pointB = this.get('lastPoint');
				for(var y = pointA.y; y <= pointB.y; y++) {
					for (var x = pointA.x; x <= pointB.x; x++) {
						inputArray.push(this.get('painting').getPixel(x,y));
						this.get('painting').setPixel(x,y,new Color({
							red: 255,
							green: 355,
							blue: 255
						}));
					}
				}
				var deltaX = this.get('dragPoint').x - this.get('downPoint1').x;
				var deltaY = this.get('dragPoint').y - this.get('downPoint1').y;
				var pointA1 = {
					x: pointA.x + deltaX,
					y: pointA.y + deltaY
				};
				var pointB1 = {
					x: pointB.x + deltaX,
					y: pointB.y + deltaY
				};
				var n = 0;
				for(var y = pointA1.y; y <= pointB1.y; y++) {
					for (var x = pointA1.x; x <= pointB1.x; x++) {
						var pixel = inputArray[n];
						this.get('painting').setPixel(x,y,pixel);
						n++;
					}
				}
				this.get('painting').displayInContext(context);
			}
		}
	});
});