export interface ISketchItem {
  id?: number;
  value: string; 
  style: React.CSSProperties; 
  type: NodeType; 
  children: ISketchItem[]; 
}

export enum NodeType {
	GROUP = 'group',
	TEXT = 'text',
	BITMAP = 'bitmap',
}

export interface IElementItem extends ISketchItem {
  id: number;
  children: IElementItem[];
  link?: string;
}
