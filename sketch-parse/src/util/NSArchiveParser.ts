import { colorParser } from '@/util/utils';

export class NSArchiveParser {
	private styles = {
		fontSize: 'normal',
		fontFamily: 'normal',
		color: 'normal',
		underline: 'normal',
		lineHeight: '',
		textAlign: 'normal',
		content: ''
	};
	constructor(archive: any) {
		this.parse(archive);
	}

	parse(archive: any) {
		let result = {};

		let objects = archive[0].$objects;
		let root = archive[0].$top.root.UID;

		let getReferenceById = (id: string) => {
			let r = {};
			let o = objects[id];
			if (typeof o === 'string' || typeof o === 'number' || typeof o === 'boolean') {
				return o;
			}

			if (typeof o === 'object') {
				for (var i in o) {
					
					if (o[i].UID) {
						r[i] = getReferenceById(o[i].UID);
					
					} else if (Array.isArray(o[i])) {
						r[i] = [];
						o[i].forEach((ao: any) => {
							if (ao.UID) {
							
								r[i].push(getReferenceById(ao.UID));
							} else {
								r[i].push(ao);
							}
						});
					} else if (i !== 'NS.keys' && i !== 'NS.objects') {
						r[i] = o[i];
					}
					this.setParseStyles(i, r[i]);
				}
			}

			if (o['NS.keys']) {
				o['NS.keys'].forEach((keyObj: any, index: number) => {
					
					let key = getReferenceById(keyObj.UID) as string;
					let obj = getReferenceById(o['NS.objects'][index].UID) as any;
					this.setParseStyles(key, obj);
				});
			}
			return r;
		};

		let topObj = objects[root];
		for (var key in topObj) {

			if (topObj[key].UID) {
				result[key] = getReferenceById(topObj[key].UID);
				this.setParseStyles(key, result[key]);
			}
		}
		return result;
	}

	setParseStyles(type: string, value: any) {
		const current = attributeTypeMap[type];
		
		if (type === 'NSParagraphStyle') {
			const align = value.NSAlignment;
			this.styles.textAlign = align === 1 ? 'right' : align === 2 ? 'center' : 'left';
			if(value.NSMaxLineHeight) {
				this.styles.lineHeight = value.NSMaxLineHeight;
			}
		
			if(value.NSMinLineHeight) {
				this.styles.lineHeight = value.NSMinLineHeight;
			}
		
		}
		if (current) {
			this.styles[current] = value;
			if (type === 'NSColor') {
				const colors = value.NSRGB.toString().split(' ').map((item: string)=>parseFloat(item));
				let alpha = 1;
				if (colors.length > 3) {
					alpha = parseFloat(colors[3]);
			}
				this.styles[current] = colorParser({ red: colors[0], green: colors[1], blue: colors[2], alpha: alpha });
			}
		}
	}

	getParseStyle() {
		return this.styles;
	}
}

const attributeTypeMap = {
	NSFontSizeAttribute: 'fontSize',
	NSColor: 'color',
	NSUnderline: 'underline',
	NSFontNameAttribute: 'fontFamily',
	NSString: 'content'
};
