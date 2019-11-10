export interface ISketchItem {
  id?: number;
  value: string; 
  style: React.CSSProperties; 
  type: ElementType; 
  children: ISketchItem[]; 
}

export enum ElementType {
	GROUP = 'group',
	TEXT = 'text',
	BITMAP = 'bitmap',
}

export interface IElementItem extends ISketchItem {
  id: number;
  children: IElementItem[];
  link?: string;
}
