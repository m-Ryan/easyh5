import { BLOCK_LEVEL } from '@/components/templete/constants';
import { INodeItem } from '@/components/templete/templete.type';

export default {
  type: 'text',
  rank: BLOCK_LEVEL.low
};

export type IText = INodeItem<string>;