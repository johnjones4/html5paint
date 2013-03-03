define(['../vendor/jquery',
	'../views/toolButton',
	'../models/tools/ellipse',
	'../models/tools/pencil',
	'../models/tools/rectangle',
	'../models/tools/polygon',
	'../models/tools/roundedRectangle',
	'../models/tools/line',
	'../models/tools/bezierLine',
	'../models/tools/fillColor',
	'../models/tools/eraser',
	'../models/tools/text',
	'../models/tools/sprayCan',
	'../models/tools/rectangleSelect',
	'../models/tools/freehandSelect'],function($,
		ToolButton,
		Ellipse,
		Pencil,
		Rectangle,
		Polygon,
		RoundedRectangle,
		Line,
		BezierLine,
		FillColor,
		Eraser,
		Text,
		SprayCan,
		RectangleSelect,
		FreehandSelect) {
	return {
		freehandSelect: function(props) {
			return new FreehandSelect(props);
		},
		rectangeSelect: function(props) {
			return new RectangleSelect(props);
		},
		sprayCan: function(props) {
			return new SprayCan(props);
		},
		text: function(props) {
			return new Text(props);
		},
		selectiveErase: function(props) {
			props.selective = true;
			props.name = 'Selective Erase';
			props.namespace = 'selective-erase';
			return new Eraser(props);
		},
		erase: function(props) {
			return new Eraser(props);
		},
		fillColor: function(props) {
			return new FillColor(props);
		},
		strokeColor: function(props) {
			props.ignoreFill = true;
			return new Pencil(props);
		},
		bezierLine: function(props) {
			return new BezierLine(props);
		},
		line: function(props) {
			return new Line(props);
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
			return new RoundedRectangle(props);
		},
		fillRoundRect: function(props) {
			props.name = 'Fill Rounded Rectangle';
			props.namespace = 'fill-round-rect';
			return new RoundedRectangle(props);
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