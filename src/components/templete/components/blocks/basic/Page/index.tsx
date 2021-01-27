import { Config } from './Panel';
import { Preview } from './Preview';
import { INodeItem } from '@/components/templete/templete.type';
import _ from 'lodash';
import { Main } from './Main';
import { BlockType } from '@/components/templete/constants';
import config from './config';

const create = () => {
  return {
    nodeItem: {
      type: config.type,
      data: {

      },
      style: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
      children: []
    }
  };
};

export const Page = {
  Config,
  Main,
  Preview,
  config,
  create
};
