import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CustomComponentType } from '@/components/templete/constants';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';

export type ISliderNumber = INodeItem<number>;
const type = CustomComponentType.SliderNumber;

const create = (): CreateElement<ISliderNumber> => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
      data: {
        value: 200000
      },
      style: {
        ...getDefaultStyle(),
        ...{
          width: 375,
          height: 20,
          position: 'relative',
          fontSize: 24,
          color: '#fff'
        }
      },
      children: []
    }
  };
};

export const SliderNumber = {
  Config,
  Main,
  Preview,
  type,
  create
};
