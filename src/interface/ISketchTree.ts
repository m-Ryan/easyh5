export interface ISketchTree {
	_class: string;
	do_objectID: string;
	frame: IFrame;
	isVisible: boolean;
	layerListExpandedType: number;
	name: string;
	resizingType: number;
	rotation: number;
	shouldBreakMaskChain: boolean;
	style: IStyle;
	hasClickThrough: boolean;
	hasBackgroundColor: boolean;
	clippingMaskMode: number;
	hasClippingMask: boolean;
	windingRule: number;
	fixedRadius: number;
	booleanOperation?: number;
	hasConvertedToNewRoundCorners: boolean;
	layers: IArtboard[];
}
export interface IFrame {
	_class: string;
	x: number;
	y: number;
	height: number;
	width: number;
	constrainProportions: boolean;
}
export interface IStyle {
	_class: string;
	endDecorationType: number;
	miterLimit: number;
	startDecorationType: number;
	fills?: IFillsItem[];
	contextSettings?: IContextSettings;
	textStyle?: ITextStyle;
	borders?: IBorders[];
}
interface IBorders {
	_class: string;
	isEnabled: boolean;
	color: IColor;
	fillType: number;
	position: number;
	thickness: number;
}
interface IFillsItem {
	_class: string;
	isEnabled: boolean;
	color?: IColor;
	image?: IImage;
	fillType: number;
	noiseIndex: number;
	noiseIntensity: number;
	patternFillType: number;
	patternTileScale: number;
}
export interface IColor {
	_class?: string;
	alpha: number;
	blue: number;
	green: number;
	red: number;
}

export interface ITextStyle {
	_class: string;
	encodedAttributes: IEncodedAttributes;
}
interface IEncodedAttributes {
	MSAttributedStringFontAttribute: IMSAttributedStringFontAttribute;
	NSKern: number;
	NSColor: INSColor;
	NSParagraphStyle: INSParagraphStyle;
}
interface IMSAttributedStringFontAttribute {
	_archive: string;
}
interface INSColor {
	_archive: string;
}
interface INSParagraphStyle {
	_archive: string;
}

interface IAttributedString {
	_class: string;
	string?: string;
	attributes?: IAttributesItem[];
	archivedAttributedString?: {
		_archive: string;
	};
}

interface IAttributesItem {
	_class: string;
	location: number;
	length: number;
	attributes: IAttributes;
}
interface IAttributes {
	MSAttributedStringFontAttribute?: IMSAttributedStringFontAttribute;
	MSAttributedStringColorAttribute?: IMSAttributedStringColorAttribute;
	textStyleVerticalAlignmentKey?: number;
	paragraphStyle?: IParagraphStyle;
	name?: string;
	size?: number;
}
interface IMSAttributedStringFontAttribute {
	_class: string;
	attributes: IAttributes;
}
interface IMSAttributedStringColorAttribute {
	_class: string;
	alpha: number;
	blue: number;
	green: number;
	red: number;
}
interface IParagraphStyle {
	_class: string;
	alignment: number;
}

interface IExportOptions {
	_class: string;
	exportFormats: any[];
	includedLayerIds: any[];
	layerOptions: number;
	shouldTrim: boolean;
	do_objectID?: string;
}

interface IImage {
	_class: string;
	_ref_class: string;
	_ref: string;
}

interface IContextSettings {
	_class: string;
	blendMode: number;
	opacity: number;
}

interface IPath {
	_class: string;
	isClosed: boolean;
	points: IPointsItem[];
}
interface IPointsItem {
	_class: string;
	cornerRadius: number;
	curveFrom: string;
	curveMode: number;
	curveTo: string;
	hasCurveFrom: boolean;
	hasCurveTo: boolean;
	point: string;
}

interface IBackgroundColor {
	_class: string;
	alpha: number;
	blue: number;
	green: number;
	red: number;
}

interface IHorizontalRulerData {
	_class: string;
	base: number;
	guides: any[];
}
interface IPresetDictionary {
	allowResizedMatching: number;
	offersLandscapeVariant: number;
	width: number;
	height: number;
	name: string;
}
interface IVerticalRulerData {
	_class: string;
	base: number;
	guides: any[];
}

export interface IText {
	_class: string;
	do_objectID: string;
	frame: IFrame;
	isVisible: boolean;
	layerListExpandedType: number;
	name: string;
	resizingType: number;
	rotation: number;
	shouldBreakMaskChain: boolean;
	style: IStyle;
	hasClickThrough: boolean;
	hasBackgroundColor: boolean;
	clippingMaskMode: number;
	hasClippingMask: boolean;
	windingRule: number;
	fixedRadius: number;
	hasConvertedToNewRoundCorners: boolean;
	attributedString: IAttributedString;
	automaticallyDrawOnUnderlyingPath: boolean;
	dontSynchroniseWithSymbol: boolean;
	glyphBounds: string;
	heightIsClipped: boolean;
	lineSpacingBehaviour: number;
	textBehaviour: number;
}

export interface IRectangle {
	_class: string;
	do_objectID: string;
	frame: IFrame;
	isVisible: boolean;
	layerListExpandedType: number;
	name: string;
	resizingType: number;
	rotation: number;
	shouldBreakMaskChain: boolean;
	style: IStyle;
	hasClickThrough: boolean;
	hasBackgroundColor: boolean;
	clippingMaskMode: number;
	hasClippingMask: boolean;
	windingRule: number;
	fixedRadius: number;
	hasConvertedToNewRoundCorners: boolean;
	path: IPath;
	booleanOperation: number;
}

export interface IBitmap {
	_class: string;
	do_objectID: string;
	frame: IFrame;
	isVisible: boolean;
	layerListExpandedType: number;
	name: string;
	resizingType: number;
	rotation: number;
	shouldBreakMaskChain: boolean;
	style: IStyle;
	hasClickThrough: boolean;
	hasBackgroundColor: boolean;
	clippingMaskMode: number;
	hasClippingMask: boolean;
	windingRule: number;
	fixedRadius: number;
	hasConvertedToNewRoundCorners: boolean;
	clippingMask: string;
	fillReplacesImage: boolean;
	image: IImage;
	nineSliceCenterRect: string;
	nineSliceScale: string;
}

export interface IShapeGroup {
	_class: string;
	do_objectID: string;
	frame: IFrame;
	isVisible: boolean;
	layerListExpandedType: number;
	name: string;
	resizingType: number;
	rotation: number;
	shouldBreakMaskChain: boolean;
	style: IStyle;
	hasClickThrough: boolean;
	hasBackgroundColor: boolean;
	clippingMaskMode: number;
	hasClippingMask: boolean;
	windingRule: number;
	fixedRadius: number;
	hasConvertedToNewRoundCorners: boolean;
	layers: ISketchType[];
	booleanOperation: number;
}

export interface IArtboard {
	_class: string;
	do_objectID: string;
	booleanOperation: number;
	exportOptions: IExportOptions;
	frame: IFrame;
	isFixedToViewport: boolean;
	isFlippedHorizontal: boolean;
	isFlippedVertical: boolean;
	isLocked: boolean;
	isVisible: boolean;
	layerListExpandedType: number;
	name: string;
	nameIsFixed: boolean;
	resizingConstraint: number;
	resizingType: number;
	rotation: number;
	shouldBreakMaskChain: boolean;
	clippingMaskMode: number;
	hasClippingMask: boolean;
	style: IStyle;
	hasClickThrough: boolean;
	layers: ISketchType[];
	backgroundColor: IBackgroundColor;
	hasBackgroundColor: boolean;
	horizontalRulerData: IHorizontalRulerData;
	includeBackgroundColorInExport: boolean;
	includeInCloudUpload: boolean;
	isFlowHome: boolean;
	presetDictionary: IPresetDictionary;
	resizesContent: boolean;
	verticalRulerData: IVerticalRulerData;
	windingRule: number;
	fixedRadius: number;
	hasConvertedToNewRoundCorners: boolean;
}

export type ISketchType = IText | IBitmap | IShapeGroup | IRectangle;
