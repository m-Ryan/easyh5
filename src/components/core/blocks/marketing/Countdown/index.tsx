import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { MarketingType } from '@/constants';

export type ICountdown = IBlockData<{
  endTime: string;
  type: 'date' | 'hour';
  gridColor: string;
  gridBgColor: string;
}>;

export const Countdown: IBlock<ICountdown> = {
  name: '倒计时',
  type: MarketingType.COUNTDOWN,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
