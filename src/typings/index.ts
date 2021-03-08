import { BlockType } from '@/constants';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export interface IBlock<T extends INodeItem = any> {
  name: string;
  type: BlockType;
  Panel: () => React.ReactNode;
  Editor: (props: any) => React.ReactNode;
  Renderer: (props: any) => React.ReactNode;
  createInstance: (payload: RecursivePartial<T>) => T;
  validChildrenType: BlockType[];
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
