import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CustomComponentType } from '@/components/templete/constants';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';


export type IScratchcard = INodeItem<{ bitmap: string; lineWidth: number }>;

const type = CustomComponentType.Scratchcard;

const create = (): CreateElement<IScratchcard> => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
      data: {
        value: {
          bitmap:
            'http://assets.maocanhua.cn/FpA9fHNuElKdr0P7RYGAxehr3xFC',
          lineWidth: 40
        }
      },
      style: {
        ...getDefaultStyle(),
        ...{
          width: 375,
          height: 200,
          position: 'relative'
        }
      },
      children: []
    }
  };
};

export const Scratchcard = {
  Config,
  Main,
  Preview,
  type,
  create
};
