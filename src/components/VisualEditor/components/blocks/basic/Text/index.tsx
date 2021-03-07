import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@VisualEditor/typings';
import { BasicType } from '@VisualEditor/constants';

export type IText = INodeItem<string>;

export const Text: IBlock<IText> = {
  name: '文本',
  type: BasicType.TEXT,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
