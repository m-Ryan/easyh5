import { Panel } from './Panel';
import { Preview } from './Preview';
import { Edit } from './Edit';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IBox = INodeItem<string>;


export const Box = {
  type: BlockType.BOX,
  Edit,
  Preview,
  Panel,
  createInstance
};
