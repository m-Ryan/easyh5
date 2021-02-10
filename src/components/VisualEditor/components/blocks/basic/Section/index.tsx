import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type ISection = INodeItem<null>;

export const Section = {
  name: '编组',
  type: BlockType.SECTION,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
