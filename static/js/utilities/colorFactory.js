define(['../models/paletteColor','../models/color'],function(
		PaletteColor,
		Color) {
	return {
		white: function(props) {
			props.color = new Color({red:255,green:255,blue:255,alpha:255});
			return new PaletteColor(props);
		},
		lightGray: function(props) {
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
			props.color = new Color({red:4,green:36,blue:243,alpha:243});
			return new PaletteColor(props);
		},
		magenta: function(props) {
			props.color = new Color({red:255,green:33,blue:245,alpha:255});
			return new PaletteColor(props);
		},
		lightYellow: function(props) {
			props.color = new Color({red:255,green:254,blue:181,alpha:255});
			return new PaletteColor(props);
		},
		lightGreen: function(props) {
			props.color = new Color({red:0,green:254,blue:160,alpha:255});
			return new PaletteColor(props);
		},
		lightCyan: function(props) {
			props.color = new Color({red:142,green:155,blue:255,alpha:255});
			return new PaletteColor(props);
		},
		lightPurple: function(props) {
			props.color = new Color({red:143,green:158,blue:250,alpha:255});
			return new PaletteColor(props);
		},
		pink: function(props) {
			props.color = new Color({red:255,green:18,blue:148,alpha:255});
			return new PaletteColor(props);
		},
		orange: function(props) {
			props.color = new Color({red:255,green:113,blue:91,alpha:255});
			return new PaletteColor(props);
		},
		black: function(props) {
			props.color = new Color({red:0,green:0,blue:0,alpha:255});
			return new PaletteColor(props);
		},
		darkGray: function(props) {
			props.color = new Color({red:135,green:136,blue:142,alpha:255});
			return new PaletteColor(props);
		},
		darkMagenta: function(props) {
			props.color = new Color({red:169,green:2,blue:85,alpha:255});
			return new PaletteColor(props);
		},
		darkYellow: function(props) {
			props.color = new Color({red:168,green:167,blue:99,alpha:255});
			return new PaletteColor(props);
		},
		darkGreen: function(props) {
			props.color = new Color({red:0,green:167,blue:98,alpha:255});
			return new PaletteColor(props);
		},
		darkTeal: function(props) {
			props.color = new Color({red:85,green:168,blue:167,alpha:255});
			return new PaletteColor(props);
		},
		darkBlue: function(props) {
			props.color = new Color({red:2,green:20,blue:160,alpha:255});
			return new PaletteColor(props);
		},
		paleMagenta: function(props) {
			props.color = new Color({red:169,green:89,blue:163,alpha:255});
			return new PaletteColor(props);
		},
		paleYellow: function(props) {
			props.color = new Color({red:150,green:150,blue:123,alpha:255});
			return new PaletteColor(props);
		},
		paleGreen: function(props) {
			props.color = new Color({red:47,green:93,blue:93,alpha:255});
			return new PaletteColor(props);
		},
		brightBlue: function(props) {
			props.color = new Color({red:2,green:133,blue:248,alpha:255});
			return new PaletteColor(props);
		},
		paleBlue: function(props) {
			props.color = new Color({red:48,green:102,blue:164,alpha:255});
			return new PaletteColor(props);
		},
		purple: function(props) {
			props.color = new Color({red:95,green:58,blue:162,alpha:255});
			return new PaletteColor(props);
		},
		paleRed: function(props) {
			props.color = new Color({red:168,green:94,blue:93,alpha:255});
			return new PaletteColor(props);
		}
	};
});