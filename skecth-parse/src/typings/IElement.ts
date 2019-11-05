import { SketchClassType } from "./ISketckItem";

export interface IElement {
	value: string;
	style: React.CSSProperties;
	type: SketchClassType;
	children: IElement[];
}
