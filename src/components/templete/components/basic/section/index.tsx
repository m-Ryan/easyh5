import { Config } from './config';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { Main } from './mian';
import { NodeType } from '@/components/templete/constants';

export type IText = INodeItem<string>;
const type = NodeType.TEXT;

const create = (): CreateElement<IText> => {
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

export const Section = {
  Config,
  Main,
  Preview,
  type,
  create
};
