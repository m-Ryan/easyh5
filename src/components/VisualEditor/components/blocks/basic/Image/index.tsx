import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IImage = INodeItem<string>;

export const Image = {
  type: BlockType.IMAGE,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
