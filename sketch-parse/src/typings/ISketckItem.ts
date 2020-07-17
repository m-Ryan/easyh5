export enum SketchClassType {
	ARTBOARD = 'artboard',
	GROUP = 'group',
	TEXT = 'text',
	BITMAP = 'bitmap',
	SHAPE_GROUP = 'shapeGroup',
	RECTANGLE = 'rectangle',
	PAGE = 'page'
}

export enum NodeType {
  BLOCK = 'block',
  TEXT = 'text',
  BITMAP = 'bitmap',
}

export interface INodeItem {
  id: number;
  data: {
    value: string
  }; 
  style: INodeStyle; 
  type: string; 
  children: INodeItem[];
  link?: string;
} 

export interface INodeStyle { 
  zIndex: number; 
  position: CSSStyleDeclaration['position']; 
  backgroundSize: string; 
  left: number; 
  top: number; 
  width: number|string; 
  height: number; 
  opacity: number; 
  backgroundColor?: string; 
  backgroundImage?: string; 
  fontSize?: string|number; 
  fontFamily?: string; 
  borderColor?: string; 
  borderStyle?: string; 
  borderWidth?: number; 
  color?: string; 
  underline?: number; 
  lineHeight?: number|string; 
	textAlign?: CSSStyleDeclaration['textAlign'];
	textDecoration?: CSSStyleDeclaration['textDecoration'];
	fontWeight?: CSSStyleDeclaration['fontWeight']; 
  borderRadius?: number; 
  transform?: CSSStyleDeclaration['transform'];
  overflow: CSSStyleDeclaration['overflow'];
  display?: string
} 
