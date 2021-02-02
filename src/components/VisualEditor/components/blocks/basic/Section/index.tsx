import { Panel } from './Panel';
import { Preview } from './Preview';
import { Edit } from './Edit';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type ISection = INodeItem<null>;


export const Section = {
  type: BlockType.SECTION,
  Edit,
  Preview,
  Panel,
  createInstance
};
