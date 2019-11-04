export interface ISketchItem { 
  value: string; 
  style: React.CSSProperties; 
  type: string; 
  children: ISketchItem[]; 
} 