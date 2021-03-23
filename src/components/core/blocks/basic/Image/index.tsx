import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IImage = IBlockData<string>;

export const Image: IBlock<IImage> = {
  name: '图片',
  type: BasicType.IMAGE,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType),
  ]
};
