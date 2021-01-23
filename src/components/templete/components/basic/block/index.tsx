import { Config } from './config';
import { Preview } from './preview';
import { INodeStyle, INodeItem } from '@/components/templete/templete.type';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { Main } from './mian';
import { NodeType } from '@/components/templete/constants';

const type = NodeType.BLOCK;
export type IBox = INodeItem<string>;
const create = (style: Partial<INodeStyle> = {}): CreateElement<IBox> => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
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
  Config,
  Main,
  Preview,
  type,
  create
};
