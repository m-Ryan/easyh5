import { Config } from './Panel';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CreateElement } from '@/components/templete/components/blocks/basic/Box/node_modules/@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { Main } from './Main';
import { BlockType } from '@/components/templete/constants';

export type IText = INodeItem<string>;
const type = BlockType.TEXT;

const create = (): CreateElement<IText> => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
      data: {
        value: '新增文本'
      },
      style: {
        ...getDefaultStyle(),
        ...{
          width: 375,
          height: 'auto',
          color: '#000',
          display: 'inline-block'
        }
      },
      children: []
    }
  };
};

export const Text = {
  Config,
  Main,
  Preview,
  type,
  create
};
