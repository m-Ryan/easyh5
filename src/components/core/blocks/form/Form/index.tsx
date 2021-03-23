import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType, FormType, MarketingType } from '@/constants';

export type IForm = IBlockData<{ uid: string; name: string; }>;

export const Form: IBlock<IForm> = {
  name: '表单',
  type: FormType.FORM,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(FormType).filter(item => item !== FormType.FORM),
    ...Object.values({ ...BasicType, ...MarketingType }),
  ]
};
