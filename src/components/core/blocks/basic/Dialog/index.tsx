import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@/typings';
import { BasicType, FormType } from '@/constants';

export type IDialog = INodeItem<{
  uid: string;
  name: string;

}>;

export const Dialog: IBlock<IDialog> = {
  name: '弹窗',
  type: BasicType.DIALOG,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType),
    ...Object.values(FormType),
  ]
};
