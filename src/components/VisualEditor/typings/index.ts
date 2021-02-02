import { BlockType } from '@VisualEditor/constants';

export interface IBlock {
	type: BlockType,
	Panel: () => JSX.Element;
	Main: (props: any) => JSX.Element;
	createInstance: (payload: any) => INodeItem;
}

export interface INodeItem<T extends any = any> {
	style: Partial<React.CSSProperties>;
	type: BlockType;
	data: {
		value: T;
		link?: string;
		action?: string;
		variable?: string;
	};
	children: INodeItem<any>[];
}

// export type IBlocksMapAction<T extends keyof IBlocksMap = any> = IBlocksMap[T]['actions'];
// export type IBlocksMapVariable<T extends keyof IBlocksMap = any> = IBlocksMap[T]['variable'];