define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'spray-can',
			name: 'Spray Can',
			width: 1,
			fillColor: null
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);

			this.drawatPoint(point);

			this.set({
				down: true
			});
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			this.end();
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down')) {
				this.drawatPoint(point);
			}
		},
		end: function() {
			var context = this.get('canvas').getContext("2d");
			this.get('painting').copyFromContext(context);
			this.set({
				down: false
			});
		},
		drawatPoint: function(point) {
			var context = this.get('canvas').getContext("2d");
			context.lineWidth = 1;
			context.lineCap = 'square';
			
			
			var radius = (this.get('width') * 4) / 2;
			var coords = new Array(radius);

			var f = 1 - radius;
			var ddF_x = 1;
			var ddF_y = -2 * radius;
			var x = 0;
			var y = radius;

			while(x < y) {
				if (f >= 0) {
					y--;
					ddF_y += 2;
					f += ddF_y;
				}
				x++;
				ddF_x += 2;
				f += ddF_x;

				coords[x-1] = y;
				coords[y-1] = x;
			}

			var _this = this;
			var fill = function(yA,minX,maxX) {
				for(var x = minX; x <= maxX; x+= _.random(1,10)) {
					_.each(yA,function(y) {
						_this.get('painting').setPixel(x,y,_this.get('fillColor'));
					});
				}
			}

			for (var y = 1; y <= radius; y += _.random(1,5)) {
				var maxX = coords[y-1];
				var minX = maxX * -1;
				var y1 = point.y - y;
				var y2 = point.y + y;
				fill([y1,y2],point.x+minX,point.x+maxX);
			}

			// var coords = coords2.concat(coords1);

			// coords.forEach(function(coord) {
			// 	console.log(coord.x,coord.y);
			// })
			
			// for (var y = 1; y < radius; y++) {
			// 	var maxX = coords[y-1].x;
			// 	var minX = maxX * -1;
			// 	console.log(y,minX,maxX);
			// }

			this.get('painting').displayInContext(context);
		}
	});
});