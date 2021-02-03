import { BlockType } from '@VisualEditor/constants';

export interface IBlock {
  type: BlockType;
  Panel: () => JSX.Element;
  Main: (props: any) => JSX.Element;
  createInstance: <T extends INodeItem>(payload: Partial<T>) => T;
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

export interface CreateInstance<T extends any = any> {
  (payload?: Partial<T>): T;
}

// export type IBlocksMapAction<T extends keyof IBlocksMap = any> = IBlocksMap[T]['actions'];
// export type IBlocksMapVariable<T extends keyof IBlocksMap = any> = IBlocksMap[T]['variable'];
