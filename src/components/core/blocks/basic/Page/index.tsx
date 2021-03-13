import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@/typings';
import { BasicType, FormType } from '@/constants';

export type IPage = INodeItem<{
  title: string;
  h5: {
    enabled: boolean;
    pageWidth: number;
    pageMaxWidth: number;
  };
}>;

export const Page: IBlock<IPage> = {
  name: '页面',
  type: BasicType.PAGE,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType).filter(type => ![BasicType.PAGE].includes(type)),
    FormType.FORM
  ]
};
