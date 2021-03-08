import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@/typings';
import { BasicType } from '@/constants';

export type IImage = INodeItem<string>;

export const Image: IBlock<IImage> = {
  name: '图片',
  type: BasicType.IMAGE,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
