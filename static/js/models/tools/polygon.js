define(['../../vendor/backbone','./tool','../color'],function(Backbone,Tool,Color) {
	return Tool.extend({
		defaults: {
			namespace: 'polygon',
			name: 'Polygon',
			points: [],
			width: 1,
			strokeColor: null,
			fillColor: null,
			ignoreFill: false
		},
		initialize: function() {

		},
		end: function() {
			this.set({
				points: []
			});
			var context = this.get('canvas').getContext("2d");
			this.get('painting').copyFromContext(context);
		},
		dblclick: function(event,point) {
			this.end();
		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);

			if (this.get('points').length == 0) {
				this.get('points').push(point);

				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);

				context.lineWidth = this.get('width');
				context.lineCap = 'square';
				context.lineJoin = 'square';
				if (this.get('strokeColor')) context.strokeStyle = this.get('strokeColor').cssColor();
				if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();
			}
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);

			this.get('points').push(point);
			
			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);

			if (this.get('points').length > 0) {
				context.beginPath();
				context.moveTo(this.get('points')[0].x,this.get('points')[0].y);
				for(var i=1;i<this.get('points').length;i++) {
					context.lineTo(this.get('points')[i].x,this.get('points')[i].y);
				}
				context.closePath();
				context.stroke();
				if (this.get('fillColor') && !this.get('ignoreFill')) {
					context.fill();
				}
			}
		},
		mouseMove: function(event,point) {
			this._super('mouseMove',event,point);

			if (this.get('down') && this.get('points').length == 1) {
				var context = this.get('canvas').getContext("2d");
				this.get('painting').displayInContext(context);
				context.beginPath();
				context.moveTo(this.get('points')[0].x,this.get('points')[0].y);
				context.lineTo(point.x,point.y);
				context.closePath();
				context.stroke();
			}
		}
	});
});