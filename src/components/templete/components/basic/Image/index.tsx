import { Config } from './Panel';
import { Main } from './Main';
import { Preview } from './Preview';
import { INodeItem } from '@/components/templete/templete.type';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { BlockType } from '@/components/templete/constants';

export type IBitmap = INodeItem<string>;
const type = BlockType.BITMAP;

const create = (url: string) => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
      data: {
        value: url || 'http://assets.maocanhua.cn/FkWeSH88STspyZduGtyjYMt4InP4'
      },
      style: {
        ...getDefaultStyle(),
        ...{
          width: 375,
          height: 200
        }
      },
      children: []
    }
  };
};

export const Bitmap = {
  Config,
  Main,
  Preview,
  type,
  create
};
