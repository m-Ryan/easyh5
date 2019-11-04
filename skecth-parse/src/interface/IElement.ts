import { SketchClassType } from '@/constants';

export interface IElement {
	value: string;
	style: React.CSSProperties;
	type: SketchClassType;
	children: IElement[];
}
