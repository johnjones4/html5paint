define(['../../vendor/backbone','./tool',],function(Backbone,Tool) {
	return Tool.extend({
		defaults: {
			namespace: 'fillcolor',
			name: 'Fill Color',
			downPoint: null,
			width: 1,
			strokeColor: null,
			fillColor: null,
			ignoreFill: false
		},
		initialize: function() {

		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);
			this.get('environment').get('canvas').setBusy(true);
			var _this = this;
			setTimeout(function() {
				var context = _this.get('canvas').getContext("2d");
				_this.get('painting').displayInContext(context);
				var matrix = [
					[0,-1],
					[1,0],
					[0,1],
					[-1,0]
				];
				var Q = [];
				var targetColor = _this.get('painting').getPixel(point.x,point.y);
				var replacementColor = _this.get('fillColor');
				Q.push(point);
				var i = 0;
				while(Q.length > 0) {
					var n = Q.shift();
					if (n.x >= 0 && n.x <= _this.get('painting').get('width')
						&& n.y >= 0 && n.x <= _this.get('painting').get('height')
						&& targetColor.equalsColor(_this.get('painting').getPixel(n.x,n.y))) {
						_this.get('painting').setPixel(n.x,n.y,replacementColor);
						_.each(matrix,function(deltas) {
							Q.push({
								x:n.x+deltas[0],
								y:n.y+deltas[1]
							});
						});
					}
					// if (i++ % 1000 == 0) {
					// 	_this.get('painting').displayInContext(context);
					// }
				}
				_this.get('painting').displayInContext(context);
				_this.get('environment').get('canvas').setBusy(false);
			},500);
		}
	});
});