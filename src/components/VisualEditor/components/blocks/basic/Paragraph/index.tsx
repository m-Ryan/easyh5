import { Panel } from './Panel';
import { Preview } from './Preview';
import { Edit } from './Edit';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IParagraph = INodeItem<string>;


export const Paragraph = {
  type: BlockType.PARAGRAPH,
  Edit,
  Preview,
  Panel,
  createInstance
};
