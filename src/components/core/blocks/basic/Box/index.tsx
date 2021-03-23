import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlockData } from '@/typings';
import { BasicType, FormType, MarketingType } from '@/constants';

export type IBox = IBlockData<null>;

export const Box = {
  name: '容器',
  type: BasicType.BOX,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values({ ...BasicType, ...MarketingType }),
    FormType.FORM
  ]
};
