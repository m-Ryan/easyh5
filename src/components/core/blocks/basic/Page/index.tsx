import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType, FormType, MarketingType } from '@/constants';

export type IPage = IBlockData<{
  title: string;
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
    ...Object.values({ ...MarketingType }),
    FormType.FORM
  ]
};
