import path from 'path';
import fs from 'fs-extra';
import unzipper from 'unzipper';
import rd from 'rd';
import { ISketchTree, ISketchType, IText, IBitmap, IRectangle, IShapeGroup, IArtboard } from '@/interface/ISketchTree';
import {  getDefaultStyle, colorParser, parseArchive } from '@/util/utils';
import { SketchClassType } from '@/constants';
import { IElement } from '@/interface/IElement';
import { uploadQiuNiuFile } from '@/upload';
const cwd = process.cwd();

export class Sketch {
	private filePath = '';
	private tempDir = path.join(cwd, 'sketch-tmp');
	private outputJson = path.join(cwd, 'public','output.json');
	private dpi: number;
	private unit: string;
	private zIndex: number = 1;
	private images: string[] = [];
	constructor(filePath: string, dpi: number = 1, unit = 'px') {
		this.filePath = filePath;
		this.dpi = dpi;
		this.unit = unit;
		this.init();
	}

	async init() {
		console.log('正在解压...')
		await this.unzip();
		console.log('解压完成。')
		console.log('解析文件...')
		const pages = await this.getPages();
		await Promise.all(pages.map((item) => this.parse(item)));
		console.log('解析完成。')
	}

	// 解压 sketch
	async unzip() {
		return fs.createReadStream(this.filePath).pipe(unzipper.Extract({ path: this.tempDir })).promise();
	}

	async getPages() {
		return rd
			.readFileFilterSync(path.join(this.tempDir, 'pages'), /\.json$/)
			.map((filename) => JSON.parse(fs.readFileSync(filename, 'utf8')));
	}

	async parse(sketchJson: ISketchTree) {
		let parsePages: any[] = [];

		const layers = sketchJson.layers;
		parsePages = layers.map((item) => {
			return this.getGroup(item as any);
		});

		await Promise.all(parsePages.map((page) => this.uploadImages(page)));
		fs.writeFileSync(this.outputJson, JSON.stringify(parsePages), 'utf8');
	}

	getChildren(group: IArtboard | IShapeGroup) {
		if (!group.layers) return [];
		return group.layers
			.map((item) => {
				if (item.clippingMaskMode || !item.isVisible) return;
				let child = null;
				switch (item._class) {
					case SketchClassType.TEXT:
						child = this.getText(item as IText);
						break;
					case SketchClassType.BITMAP:
						child = this.getBitmap(item as IBitmap);
						break;
					case SketchClassType.RECTANGLE:
						child = this.getRectangle(item as IRectangle);
						break;
					default:
						child = this.getGroup(item as IShapeGroup);
				}
				if (child) {
					return child;
				} else {
					// throw new Error('有未解析的元素：' + item._class);
					return null;
				}
			})
			.filter((item) => !!item) as IElement[];
	}

	getPage(artboard: IArtboard | IShapeGroup) {
		const element: IElement = {
			value: '',
			style: getDefaultStyle(this.unit),
			type: SketchClassType.ARTBOARD,
			children: []
		};
		this.setStyle(artboard);
		element.children = this.getChildren(artboard);
		return element;
	}

	getArtboard(artboard: IArtboard | IShapeGroup) {
		const element: IElement = {
			value: '',
			style: getDefaultStyle(this.unit),
			type: SketchClassType.ARTBOARD,
			children: []
		};
		this.setStyle(artboard);
		element.children = this.getChildren(artboard);
		return element;
	}

	getGroup(group: IShapeGroup) {
		const element: IElement = {
			value: '',
			style: getDefaultStyle(this.unit),
			type: SketchClassType.GROUP,
			children: []
		};
		this.setStyle(group);
		element.children = this.getChildren(group);
		return element;
	}

	getText(item: IText) {
		const element: IElement = {
			value: '',
			style: getDefaultStyle(this.unit),
			type: SketchClassType.TEXT,
			children: []
		};
		this.setStyle(item);

		if (item.name) {
			element.value = item.name
		}

		if (item.attributedString.string) {
			element.value = item.attributedString.string
		}

		if (item.attributedString.archivedAttributedString) {
			const parseStyle = parseArchive(item.attributedString.archivedAttributedString._archive, this.unit);
			if (!parseStyle.lineHeight && element.style.height) {
				parseStyle.lineHeight = element.style.height.toString();
			}
			if (parseStyle.content) {
				element.value = parseStyle.content;
			}

			delete parseStyle.content;
			Object.assign(element.style, parseStyle);
		}
		return element;
	}

	getBitmap(item: IBitmap) {
		const element: IElement = {
			value: '',
			style: getDefaultStyle(this.unit),
			type: SketchClassType.BITMAP,
			children: []
		};
		if (item.image._ref.endsWith('.png')) {
			element.value = path.join(this.tempDir, item.image._ref);
		} else {
			element.value = path.join(this.tempDir, item.image._ref + '.png');
		}
		this.setStyle(item);
		return element;
	}

	getRectangle(item: IRectangle) {
		const element: IElement = {
			value: '',
			style: getDefaultStyle(this.unit),
			type: SketchClassType.RECTANGLE,
			children: []
		};
		this.setStyle(item);
		return element;
	}

	unitConvert(value: string | number) {
		return (Number(value) * this.dpi).toFixed(2) + this.unit;
	}

	setStyle(item: ISketchType) {
		const { x, y, width, height } = item.frame;
		const style  = getDefaultStyle(this.unit);
		style.left = this.unitConvert(x);
		style.top = this.unitConvert(y);
		style.width =  this.unitConvert(width);
		style.height = this.unitConvert(height);
		style.zIndex = this.zIndex++;

		if (item.fixedRadius) {
			style.borderRadius = item.fixedRadius.toString();
		}

		if (item.style && item.style.contextSettings) {
			style.opacity = item.style.contextSettings.opacity;
		}
		if (item.style && item.style.borders) {
			const borderItem = item.style.borders[0]
			if (borderItem.isEnabled) {
				if (item._class == 'text') {
					if (this.unitConvert(borderItem.thickness)) {
						// style.textStrokeWidth = this.unitConvert(borderItem.thickness)
					}
					// style.textStrokeColor = colorParser(borderItem.color);
				} else {
					style.borderColor = colorParser(borderItem.color);
					if (this.unitConvert(borderItem.thickness)) {
						style.borderWidth = this.unitConvert(borderItem.thickness)
					}
					style.borderStyle = 'solid';
				}

			}
		}

		const fills = item.style && item.style.fills && item.style.fills[0];
		if (fills && fills.isEnabled) {
			if (fills.color) {
				if (item._class == 'text') {
					style.color = colorParser(fills.color);
				} else {
					style.backgroundColor = colorParser(fills.color);
				}
			}
			if (fills.image && fills.image._ref) {
				if (fills.image._ref.endsWith('.png')) {
					style.backgroundImage = path.join(this.tempDir, fills.image._ref);
				} else {
					style.backgroundImage = path.join(this.tempDir, fills.image._ref + '.png');
				}
			}
		}
	}

	async uploadImages(item: IElement) {
		if (item.style.backgroundImage) {
			let url = await uploadQiuNiuFile(item.style.backgroundImage);
			item.style.backgroundImage = `url(${url})`;
			this.images.push(url);
		}
		if (item.type === SketchClassType.BITMAP) {
			this.images.push(item.value);
			item.value = await uploadQiuNiuFile(item.value);
		}
		for (let child of item.children) {
			await this.uploadImages(child);
		}
	}
}
