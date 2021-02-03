import { Panel } from './Panel';
import { Preview } from './Preview';
import { Edit } from './Edit';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IText = INodeItem<string>;

export const Text = {
  type: BlockType.TEXT,
  Edit,
  Preview,
  Panel,
  createInstance,
};
