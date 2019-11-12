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
  BOX = 'box',
  TEXT = 'text',
  BITMAP = 'bitmap',
}

export interface INodeItem {
  id: number;
  value: string; 
  style: INodeStyle; 
  type: string; 
  children: INodeItem[];
  link?: string;
} 

export interface INodeStyle { 
  zIndex: number; 
  position: React.CSSProperties['position']; 
  backgroundSize: string; 
  left: number; 
  top: number; 
  width: number; 
  height: number; 
  opacity: number; 
  backgroundColor?: string; 
  backgroundImage?: string; 
  fontSize?: string; 
  fontFamily?: string; 
  borderColor?: string; 
  borderStyle?: string; 
  borderWidth?: number; 
  color?: string; 
  underline?: number; 
  lineHeight?: number; 
	textAlign?: React.CSSProperties['textAlign'];
	textDecoration?: React.CSSProperties['textDecoration'];
	fontWeight?: React.CSSProperties['fontWeight']; 
  borderRadius?: React.CSSProperties['borderRadius']; 
} 
