define(['../../vendor/backbone','./tool',],function(Backbone,Tool) {
	return Tool.extend({
		defaults: {
			namespace: 'text',
			name: 'Text',
			downPoint: null,
			fontSize: 12,
			fontFamily: 'Arial',
			fillColor: null,
			text: '',
			shift: false,
			cursor: 0
		},
		initialize: function() {

		},
		mouseDown: function(event,point) {
			this._super('mouseDown',event,point);
			this.end();
		},
		mouseUp: function(event,point) {
			this._super('mouseUp',event,point);

			var context = this.get('canvas').getContext("2d");
			this.get('painting').displayInContext(context);

			if (this.get('fillColor')) context.fillStyle = this.get('fillColor').cssColor();
			context.font = this.get('fontSize') + 'px ' + this.get('fontFamily');

			this.set({
				downPoint: point
			});

			this.renderType(true);
		},
		end: function() {
			this.renderType(false);
			var context = this.get('canvas').getContext("2d");
			this.get('painting').copyFromContext(context);

			this.set({
				downPoint: null,
				text: '',
				shift: false,
				cursor: 0
			});
		},
		renderType: function(withCursor) {
			if (this.get('downPoint')) {
				var text = this.get('text');
				var renderString;
				if (withCursor) {
					var index = this.get('cursor');
					var cursor = '|';
					renderString = text.substring(0,index)+cursor+text.substring(index);
				} else {
					renderString = text;
				}

				var context = this.get('canvas').getContext("2d");
				var point = this.get('downPoint');
				this.get('painting').displayInContext(context);
				context.fillText(renderString,point.x,point.y);
			}
		},
		keypress: function(event) {
			if (event.preventDefault()) event.preventDefault();
			return false;
		},
		insertChar: function(chars) {
			var string = this.get('text');
			var index = this.get('cursor');
			var newString;
			if (index < string.length) {
				newString = string.substring(0,index)+chars+string.substring(index);
			} else {
				newString = string+chars;
			}
			this.set({
				text: newString,
				cursor: index+1
			});
		},
		keydown: function(event) {
			if (event.preventDefault()) event.preventDefault();
			if (this.get('downPoint') && event) {
				if ((event.keyCode >= 48 && event.keyCode <= 90) 
					|| (event.keyCode >= 96 && event.keyCode <= 111) 
					|| (event.keyCode >= 186 && event.keyCode <= 192) 
					|| (event.keyCode >= 219 && event.keyCode <= 222)) {
					var character = String.fromCharCode(event.keyCode);
					if (this.get('shift')) 
						character = character.toUpperCase();
					else
						character = character.toLowerCase();
					this.insertChar(character);
				} else {
					switch(event.keyCode) {
						case 37:
							var nextCursor = this.get('cursor')-1;
							if (nextCursor >= 0) this.set({cursor: nextCursor});
							break;
						case 39:
							var nextCursor = this.get('cursor')+1;
							if (nextCursor <= this.get('text').length) this.set({cursor: nextCursor});
							break;
						case 46:
							var toDelete = this.get('cursor');
							var string = this.get('text');
							if (toDelete < this.get('text').length) {
								this.set({
									text: string.substring(0,toDelete-1)+string.substring(toDelete)
								});
							}
							break;
						case 8:
							var toDelete = this.get('cursor')-1;
							var string = this.get('text');
							if (toDelete >= 0) {
								this.set({
									text: string.substring(0,toDelete)+string.substring(toDelete+1),
									cursor: toDelete
								});
							}
							break;
						case 9:
							this.insertChar('    ');
							break;
						case 13:
							this.insertChar('\n');
							break;
						case 16:
							this.set({shift:true});
							break;
						case 32:
							this.insertChar(' ');
							break
					}
				}
				this.renderType(true);
			}
			return false;
		},
		keyup: function(event) {
			if (event.preventDefault()) event.preventDefault();
			switch(event.keyCode) {
				case 16:
					this.set({shift:false});
					break;
			}
			return false;
		}
	});
});