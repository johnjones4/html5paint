define(['../vendor/jquery',
	'../views/toolButton',
	'../models/tools/ellipse',
	'../models/tools/pencil',
	'../models/tools/rectangle',
	'../models/tools/polygon'],function($,
		ToolButton,
		Ellipse,
		Pencil,
		Rectangle,
		Polygon) {
	return {
		polygonSelect: function(props) {
			return null;
		},
		rectangeSelect: function(props) {
			return null;
		},
		sprayCan: function(props) {
			return null
		},
		text: function(props) {
			return null;
		},
		selectiveErase: function(props) {
			return null;
		},
		erase: function(props) {
			return null;
		},
		fillColor: function(props) {
			return null;
		},
		strokeColor: function(props) {
			props.ignoreFill = true;
			return new Pencil(props);
		},
		bezierLine: function(props) {
			return null;
		},
		line: function(props) {
			return null;
		},
		strokeRect: function(props) {
			props.ignoreFill = true;
			props.name = 'Stroke Rectangle';
			props.namespace = 'stroke-rect';
			return new Rectangle(props);
		},
		fillRect: function(props) {
			props.name = 'Fill Rectangle';
			props.namespace = 'fill-rect';
			return new Rectangle(props);
		},
		strokeRoundRect: function(props) {
			props.ignoreFill = true;
			props.name = 'Stroke Rounded Rectangle';
			props.namespace = 'stroke-round-rect';
			return null;
		},
		fillRoundRect: function(props) {
			props.name = 'Fill Rounded Rectangle';
			props.namespace = 'fill-round-rect';
			return null;
		},
		strokeEllipse: function(props) {
			props.ignoreFill = true;
			props.name = 'Stroke Ellipse';
			props.namespace = 'stroke-ellipse';
			return new Ellipse(props);
		},
		fillEllipse: function(props) {
			props.name = 'Fill Ellipse';
			props.namespace = 'fill-ellipse';
			return new Ellipse(props);	
		},
		strokePolygon: function(props) {
			props.ignoreFill = true;
			return new Polygon(props);
		},
		fillPolygon: function(props) {
			props.namespace = 'fill-polygon';
			return new Polygon(props);
		}
	};
});