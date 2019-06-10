import { SketchClassType } from '@/constants';
import { IBaseStyle } from '@/interface/IBaseStyle';
import { IColor } from '@/interface/ISketchTree';
import { NSArchiveParser } from '@/util/NSArchiveParser';
const bplistParser = require('bplist-parser');
export function isText(classType: string) {
	return classType === SketchClassType.TEXT;
}

export function isBitmap(classType: string) {
	return classType === SketchClassType.BITMAP;
}

export function isRectangle(classType: string) {
	return classType === SketchClassType.RECTANGLE;
}

export function isShapeGroup(classType: string) {
	return classType === SketchClassType.SHAPE_GROUP;
}

export function isArtboard(classType: string) {
	return classType === SketchClassType.ARTBOARD;
}

export function isPage(classType: string) {
	return classType === SketchClassType.PAGE;
}

export function parseArchive(base64String: string, unit: string) {
	const buf2 = Buffer.from(base64String, 'base64');
	const obj = bplistParser.parseBuffer(buf2);
	const nsParse = new NSArchiveParser(obj, unit);
	return nsParse.getParseStyle();
}

export async function uploadImage(url: string) {
	return 'http://assets.maocanhua.cn/FrIHg7SNAUqOU1WAlLGz6uCmHBiD';
}
export function colorParser(color: IColor) {
	return `rgba(${parseFloat((color.red * 255).toString())},${parseFloat((color.green * 255).toString())},${parseFloat((color.blue * 255).toString())},${color.alpha || 0})`;
}
export function getDefaultStyle(unit: string = ''): IBaseStyle {
	return {
		zIndex: 0,
		position: 'absolute',
		opacity: 1,
		color: '#000',
		fontSize: '14' + unit,
		fontFamily: 'normal',
		top: '0',
		left: '0',
		width: 'normal',
		height: 'normal',
		lineHeight: 'normal',
		textDecoration: 'none',
		bold: 'normal',
		backgroundColor: 'transparent',
		borderRadius: '0',
		backgroundImage: '',
		backgroundSize: '100%',
		marginTop: '0',
		borderColor: 'transparent',
		borderWidth: '0',
		borderStyle: 'none',
		boxShadow: 'none',
		textAlign: 'left',
		overflow: 'visible',
		whiteSpace: 'pre-wrap'
	};
}
