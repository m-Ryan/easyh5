import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import {
  INodeItem,
  INodeStyle
} from '@/components/templete/templete.type';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import { getDefaultStyle } from '@/util/utils';
import { CustomComponentType } from '@/components/templete/constants';
type Iaward = {
  id: number;
	text: string; // 奖品名称
	bgColor: string; // 奖品区块对应背景颜色
	color: string; // 奖品区块对应字体颜色
	bitmap: string;
};

export type ITurntable = INodeItem<{
  awards: Iaward[];
  selectId: number;
	outsideRadius: number; // 大转盘外圆的半径
	insideRadius: number; // 大转盘内圆的半径
	textDistance: number; // 大转盘奖品位置距离圆心的距离
	bitmapSize: number; // 图片大小
	fontSize: number; // 字体大小
	speed: number; // 字体大小
}>;

const type = CustomComponentType.Turntable;

const create = (style: Partial<INodeStyle> = {}): CreateElement<ITurntable> => {
  return {
    nodeItem: {
      id: _.uniqueId(),
      type,
      data: {
        value: {
          outsideRadius: 375,
          insideRadius: 100,
          textDistance: 50,
          bitmapSize: 80,
          fontSize: 40,
          speed: 2,
          selectId: 0,
          awards: [
            {
              id: 1,
              bitmap:
                'http://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
              bgColor: '#F8D484',
              text: '苹果手机',
              color: '#AC6900'
            },
            {
              id: 2,
              bitmap:
                'http://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
              bgColor: '#FEE8A6',
              text: '扫地机器人2',
              color: '#AC6900'
            },
            {
              id: 3,
              bitmap:
                'http://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
              bgColor: '#F8D484',
              text: '扫地机器人2',
              color: '#AC6900'
            },
            {
              id: 4,
              bitmap:
                'http://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
              bgColor: '#FEE8A6',
              text: '精品图书',
              color: '#AC6900'
            },
            {
              id: 5,
              bitmap:
                'http://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
              bgColor: '#F8D484',
              text: '扫地机器人',
              color: '#AC6900'
            },
            {
              id: 6,
              bitmap:
                'http://assets.maocanhua.cn/Ftaale43_Wimv_vps81NYWHNV-Hx',
              bgColor: '#FEE8A6',
              text: '扫地机器人',
              color: '#AC6900'
            }
          ]
        }
      },
      style: {
        ...getDefaultStyle(),
        ...{
          width: 375,
          height: 375,
          position: 'relative',
          ...style
        }
      },
      children: []
    }
  };
};

export const Turntable = {
  Config,
  Main,
  Preview,
  type,
  create
};
