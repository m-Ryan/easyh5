import { NSArchiveParser } from '@/util/NSArchiveParser';
import React from 'react';
import { SketchClassType } from '@/typings/ISketckItem';
import { IColor } from '@/typings/ISketchTree';
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

export function parseArchive(base64String: string) {
	const buf2 = Buffer.from(base64String, 'base64');
	const obj = bplistParser.parseBuffer(buf2);
	const nsParse = new NSArchiveParser(obj);
	const styles = nsParse.getParseStyle();
	if (styles.underline && (styles.underline !== 'none')) {
		styles['textDecoration'] = 'underline';
	}
	return styles;
}

export async function uploadImage(url: string) {
	return 'http://assets.maocanhua.cn/FrIHg7SNAUqOU1WAlLGz6uCmHBiD';
}
export function colorParser(color: IColor) {
	return `rgba(${parseFloat((color.red * 255).toString())},${parseFloat((color.green * 255).toString())},${parseFloat((color.blue * 255).toString())},${color.alpha || 0})`;
}

export function getDefaultStyle(unit: string = ''): DefaultType {
	return {
		zIndex: 0,
		position: 'absolute',
		backgroundSize: '100%',
	};
}

type DefaultType = { 
	zIndex: number;
	position: 'absolute',
	backgroundSize: string
}