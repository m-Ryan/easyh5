import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { CreateElement } from '@/modal/useArticle';
import { NodeType } from '@/components/templete/constants';

export type IBitmap = INodeItem<string>;
const type = NodeType.BITMAP;

const create = (url: string): CreateElement<IBitmap> => {
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
