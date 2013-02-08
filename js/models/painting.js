Painting = Backbone.Model.extend({
	defaults: {
		width: 640,
		height: 480,
		name: 'Untitled'
	},
	initialize: function(){
		this.set({
			data: this.get('context').createImageData(this.get('width'),this.get('height'))
		});
		this.on("change:width", function(model) {
			data.width = model.get('width');
		});
		this.on("change:width", function(model) {
			data.height = model.get('height');
		});
		this.on("change:data", function(model) {
			c.putImageData(model.get('data'), 0, 0);
		});
	},
	setPixel: function(x,y,color) {
		var index = ((y*this.get('width'))+x)*4;
		var dataArray = this.get('data').data;
		if (dataArray && index < dataArray.length && color) {
			dataArray[index] = color.get('red');
			dataArray[index+1] = color.get('green');
			dataArray[index+2] = color.get('blue');
			dataArray[index+3] = color.get('alpha');
			this.trigger('change:data',this);
		} else {
			console.log('Index out of range!');
		}
	},
	getPixel: function(x,y) {
		var index = ((y*this.get('width'))+x)*4;
		if (dataArray && index < dataArray.length && color) {
			return new Pixel({
				red: dataArray[index],
				green: dataArray[index+1],
				blue: dataArray[index+2],
				alpha: dataArray[index+3]
			});
		} else {
			console.log('Index out of range!');
			return null;
		}
	}
});