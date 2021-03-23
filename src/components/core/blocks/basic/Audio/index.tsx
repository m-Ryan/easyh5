import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IAudio = IBlockData<{
  src: string;
  controls: boolean;
  autoplay: boolean;
  loop: boolean;
}>;

export const Audio: IBlock<IAudio> = {
  name: '音频',
  type: BasicType.AUDIO,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
