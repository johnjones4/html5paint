define(['../models/paletteColor','../models/color'],function(
		PaletteColor,
		Color) {
	return {
		white: function(props) {
			props.color = new Color({red:255,green:255,blue:255,alpha:255});
			return new PaletteColor(props);
		},
		darkGray: function(props) {
			props.color = new Color({red:192,green:199,blue:200,alpha:255});
			return new PaletteColor(props);
		},
		red: function(props) {
			props.color = new Color({red:255,green:0,blue:27,alpha:255});
			return new PaletteColor(props);
		},
		yellow: function(props) {
			props.color = new Color({red:255,green:253,blue:89,alpha:255});
			return new PaletteColor(props);
		},
		green: function(props) {
			props.color = new Color({red:0,green:253,blue:85,alpha:255});
			return new PaletteColor(props);
		},
		teal: function(props) {
			props.color = new Color({red:0,green:255,blue:254,alpha:255});
			return new PaletteColor(props);
		},
		blue: function(props) {
			props.color = new Color({red:4,green:255,blue:36,alpha:243});
			return new PaletteColor(props);
		},
		magenta: function(props) {
			props.color = new Color({red:255,green:33,blue:245,alpha:255});
			return new PaletteColor(props);
		}
	};
});