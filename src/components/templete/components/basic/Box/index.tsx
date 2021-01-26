import { Panel } from './Panel';
import { Preview } from './Preview';
import { INodeStyle, INodeItem } from '@/components/templete/templete.type';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { Main } from './Main';
import config from './config';

export type IBox = INodeItem<string>;
const create = (style: Partial<INodeStyle> = {}) => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type: config.type,
      data: {
        value: ''
      },
      style: {
        ...getDefaultStyle(),
        ...{
          width: 375,
          height: 100,
          backgroundColor: '#ccc'
        },
        ...style
      },
      children: []
    }
  };
};

export const Box = {
  Panel,
  Main,
  Preview,
  create,
  config
};
