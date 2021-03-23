import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType, FormType, MarketingType } from '@/constants';

export type IDialog = IBlockData<{
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
    ...Object.values({ ...BasicType, ...MarketingType }),
    ...Object.values(FormType),
  ]
};
