import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CustomComponentType } from '@/components/templete/constants';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';

export type ISwiper = INodeItem<{
  list: string[];
  dots: boolean;
  autoPlay: boolean;
}>;

const type = CustomComponentType.Swiper;

const create = (): CreateElement<ISwiper> => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
      data: {
        value: {
          list: [
            'https://img.lycheer.net/banner/index/7ef887bf4a91cfffc15336d139e52021.jpeg?imageView2/format/webp/2/w/800/q/85!'
          ],
          dots: true,
          autoPlay: true
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

export const Swiper = {
  Config,
  Main,
  Preview,
  type,
  create
};
