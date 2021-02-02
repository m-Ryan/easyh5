import { Panel } from './Panel';
import { Preview } from './Preview';
import { Edit } from './Edit';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IPage = INodeItem<null>;


export const Page = {
  type: BlockType.PAGE,
  Edit,
  Preview,
  Panel,
  createInstance
};
