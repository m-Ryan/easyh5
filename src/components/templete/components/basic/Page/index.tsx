import { Config } from './Panel';
import { Preview } from './Preview';
import { INodeItem } from '@/components/templete/templete.type';
import _ from 'lodash';
import { Main } from './Main';
import { BlockType } from '@/components/templete/constants';
import config from './c';

const create = () => {
  return {
    nodeItem: {
      type,
      data: {

      },
      style: {
        position: 'relative',
        width: '100%',
        height: 'auto',
      },
      children: []
    }
  };
};

export const Page = {
  Config,
  Main,
  Preview,
  type,
  create
};
