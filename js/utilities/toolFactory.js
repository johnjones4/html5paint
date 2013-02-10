define(['../models/tools/ellipse','../models/tools/pencil','../models/tools/rectangle'],function(Ellipse,Pencil,Rectangle) {
	return {
		ellise: function(props) {
			return new Ellipse(props);
		},
		pencil: function(props) {
			return new Pencil(props);
		},
		rectangle: function(props) {
			return new Rectangle(props);
		}
	};
});