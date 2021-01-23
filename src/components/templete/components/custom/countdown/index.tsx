import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import baseCountdown from './countdown.json';
import { CustomComponentType } from '@/components/templete/constants';
export type ICountdown = INodeItem<number>;

const type = CustomComponentType.Countdown;

const create = (): CreateElement<ICountdown> => {
  const temp = baseCountdown as any;
  return {
    nodeItem: _.cloneDeep(temp)
  };
};

export const Countdown = {
  Config,
  Main,
  Preview,
  type,
  create
};
