export interface ISketchItem { 
  value: string; 
  style: React.CSSProperties; 
  type: SketchClassType; 
  children: ISketchItem[]; 
}

export enum SketchClassType {
	ARTBOARD = 'artboard',
	GROUP = 'group',
	TEXT = 'text',
	BITMAP = 'bitmap',
	SHAPE_GROUP = 'shapeGroup',
	RECTANGLE = 'rectangle',
	PAGE = 'page'
}
