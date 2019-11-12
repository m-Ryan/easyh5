import path from 'path';
import fs from 'fs-extra';
import unzipper from 'unzipper';
import rd from 'rd';
import { ISketchTree, ISketchType, IText, IBitmap, IRectangle, IShapeGroup, IArtboard } from '@/typings/ISketchTree';
import {  getDefaultStyle, colorParser, parseArchive } from '@/util/utils';
import { uploadQiuNiuFile } from '@/upload';
import { SketchClassType, INodeItem, INodeStyle, NodeType } from '@/typings/ISketckItem';
const cwd = process.cwd();
let nodeId = 0;
export class Sketch {
	private filePath = '';
	private tempDir = path.join(cwd, 'sketch-tmp');
	private outputJson = path.join(cwd, 'public','output.json');
	private zIndex: number = 1;
	private images: string[] = [];
	constructor(filePath: string) {
		this.filePath = filePath;
		this.init();
	}

	async init() {
		console.log('正在解压...')
		await this.unzip();
		console.log('解压完成。')
		console.log('解析文件...')
		const pages = await this.getPages();
		await Promise.all(pages.map((item) => this.parse(item))).catch(error=>console.log(error));
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
			.filter((item) => !!item) as INodeItem[];
	}

	getPage(artboard: IArtboard | IShapeGroup) {
		const element: INodeItem = {
			id: ++nodeId,
			value: '',
			style: getDefaultStyle(),
			type: NodeType.BOX,
			children: []
		};
		this.setStyle(element.style, artboard);
		element.children = this.getChildren(artboard);
		return element;
	}

	getArtboard(artboard: IArtboard | IShapeGroup) {
		const element: INodeItem = {
			id: ++nodeId,
			value: '',
			style: getDefaultStyle(),
			type: NodeType.BOX,
			children: []
		};
		this.setStyle(element.style, artboard);
		element.children = this.getChildren(artboard);
		return element;
	}

	getGroup(group: IShapeGroup) {
		const element: INodeItem = {
			id: ++nodeId,
			value: '',
			style: getDefaultStyle(),
			type: NodeType.BOX,
			children: []
		};
		this.setStyle(element.style, group);
		element.children = this.getChildren(group);
		return element;
	}

	getText(item: IText) {
		const element: INodeItem = {
			id: ++nodeId,
			value: '',
			style: getDefaultStyle(),
			type: NodeType.TEXT,
			children: []
		};
		this.setStyle(element.style, item);

		if (item.name) {
			element.value = item.name
		}

		if (item.attributedString.string) {
			element.value = item.attributedString.string
		}

		if (item.attributedString.archivedAttributedString) {
			const parseStyle = parseArchive(item.attributedString.archivedAttributedString._archive);
			if (!parseStyle.lineHeight && element.style.height) {
				parseStyle.lineHeight = element.style.height.toString();
			}
			if (parseStyle.content) {
				element.value = parseStyle.content;
			}
			parseStyle.fontSize = parseStyle.fontSize;
			parseStyle.lineHeight = parseStyle.lineHeight;

			delete parseStyle.content;
			Object.assign(element.style, parseStyle);
		}
		return element;
	}

	getBitmap(item: IBitmap) {
		const element: INodeItem = {
			id: ++nodeId,
			value: '',
			style: getDefaultStyle(),
			type: NodeType.BITMAP,
			children: []
		};
		if (item.image._ref.endsWith('.png')) {
			element.value = path.join(this.tempDir, item.image._ref);
		} else {
			element.value = path.join(this.tempDir, item.image._ref + '.png');
		}
		this.setStyle(element.style, item);
		return element;
	}

	getRectangle(item: IRectangle) {
		const element: INodeItem = {
			id: ++nodeId,
			value: '',
			style: getDefaultStyle(),
			type: NodeType.BOX,
			children: []
		};
		this.setStyle(element.style, item);
		return element;
	}

	setStyle(style: INodeStyle, item: ISketchType) {
		const { x, y, width, height } = item.frame;
		style.left = x;
		style.top = y;
		style.width =  width;
		style.height = height;
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
					// style.textStrokeWidth = this.unitConvert(borderItem.thickness) || 'none';
					// style.textStrokeColor = colorParser(borderItem.color);
				} else {
					style.borderColor = colorParser(borderItem.color);
					if (borderItem.thickness) {
						style.borderWidth = borderItem.thickness;
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

	async uploadImages(item: INodeItem) {
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
