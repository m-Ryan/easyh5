import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IBox = INodeItem<null>;

export const Box = {
  type: BlockType.BOX,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
