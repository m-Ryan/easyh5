import { SketchClassType } from '@/constants';
import { IBaseStyle } from '@/interface/IBaseStyle';

export interface IElement {
	value: string;
	style: IBaseStyle;
	type: SketchClassType;
	children: IElement[];
}
