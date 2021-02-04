import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IParagraph = INodeItem<string>;

export const Paragraph = {
  type: BlockType.PARAGRAPH,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
