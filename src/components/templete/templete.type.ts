import { componentActionMap, CustomComponentType, BlockType, BLOCK_LEVEL } from './constants';

export interface IBlock {
	Panel: () => JSX.Element;
	Main: (props: any) => JSX.Element;
	Preview: (props: any) => JSX.Element;
	config: {
		type: string;
		rank: BLOCK_LEVEL;
	};
	create: (payload: any) => INodeItem;
}

export type IBlocksMap = typeof componentActionMap;

export type IBlocksMapAction<T extends keyof IBlocksMap = any> = IBlocksMap[T]['actions'];
export type IBlocksMapVariable<T extends keyof IBlocksMap = any> = IBlocksMap[T]['variable'];
export interface INodeItem<T extends any = any> {
	style: INodeStyle;
	type: BlockType | CustomComponentType;
	rank: number;
	data: {
		value: T;
		link?: string;
		action?: string;
		variable?: string;
	};
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
