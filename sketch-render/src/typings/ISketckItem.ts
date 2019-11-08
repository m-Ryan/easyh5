export interface ISketchItem { 
  value: string; 
  style: React.CSSProperties; 
  type: ElementType; 
  children: ISketchItem[]; 
}

export enum ElementType {
	ARTBOARD = 'artboard',
	GROUP = 'group',
	SHAPE_GROUP = 'shapeGroup',
	RECTANGLE = 'rectangle',
	PAGE = 'page',
	TEXT = 'text',
	BITMAP = 'bitmap',
}

export interface IElementItem extends ISketchItem {
  id: number;
  children: IElementItem[];
  link?: string;
}