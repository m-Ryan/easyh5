import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IText = INodeItem<string>;

export const Text = {
  name: '文本',
  type: BlockType.TEXT,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
