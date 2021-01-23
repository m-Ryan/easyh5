import { componentActionMap, CustomComponentType, NodeType } from "./constants";

export type IComponentMap = typeof componentActionMap;

export type IComponentMapAction<T extends keyof IComponentMap = any> = IComponentMap[T]['actions'];
export type IComponentMapVariable<T extends keyof IComponentMap = any> = IComponentMap[T]['variable'];
export interface INodeItem<T extends any = any> {
	id: string;
	style: INodeStyle;
	type: NodeType | CustomComponentType;
	data: {
		value: T;
		link?: string;
		action?: string;
		variable?: string;
	};
	parentId?: string;
	children: INodeItem<any>[];
}

export interface INodeStyle extends Partial<React.CSSProperties> {
	zIndex: number;
	position: React.CSSProperties['position'];
	backgroundSize: string;
	left: number;
	top: number;
	width: number | string;
	height: number | string;
	opacity: number;
	marginTop?: number;
	marginRight?: number;
	marginBottom?: number;
	marginLeft?: number;
	paddingTop?: number;
	paddingRight?: number;
	paddingBottom?: number;
	paddingLeft?: number;
	backgroundColor?: string;
	backgroundImage?: string;
	fontSize: number;
}
