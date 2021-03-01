import { BlockType } from '@VisualEditor/constants';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

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
  (payload?: RecursivePartial<T>): T;
}
