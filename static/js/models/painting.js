define(['../vendor/backbone','./color'],function(Backbone,Color) {
	return Backbone.Model.extend({
		defaults: {
			width: 640,
			height: 480,
			name: 'Untitled',
			tool: null
		},
		initialize: function() {
			this.set({
				data: new Array(this.get('width')*this.get('height')*4)
			});
		},
		setPixel: function(x,y,color) {
			var index = ((y*this.get('width'))+x)*4;
			if (this.get('data') && index < this.get('data').length && color) {
				this.get('data')[index] = color.get('red');
				this.get('data')[index+1] = color.get('green');
				this.get('data')[index+2] = color.get('blue');
				this.get('data')[index+3] = color.get('alpha');
				this.trigger('change:data',this);
				return true;
			} else {
				console.log(index,this.get('data').length);
				return false;
			}
		},
		getPixel: function(x,y) {
			var index = ((y*this.get('width'))+x)*4;
			var dataArray = this.get('data');
			if (dataArray && index < dataArray.length) {
				return new Color({
					red: dataArray[index],
					green: dataArray[index+1],
					blue: dataArray[index+2],
					alpha: dataArray[index+3]
				});
			} else {
				console.log('Index out of range!');
				return null;
			}
		},
		getImageData: function(context) {
			var imageData = context.createImageData(this.get('width'),this.get('height'));
			for(var i=0;i<imageData.data.length;i++) {
				imageData.data[i] = this.get('data')[i];
			}
			return imageData;
		},
		displayInContext: function(context) {
			context.putImageData(this.getImageData(context), 0, 0);
		},
		copyFromContext: function(context) {
			var imageData = context.getImageData(0,0,this.get('width'),this.get('height'));
			if (imageData) {
				this.set({data:imageData.data});
				return true;
			} else {
				return false;
			}
		}
	});
});