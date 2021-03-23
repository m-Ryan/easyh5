import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { BasicType } from '@/constants';

export type IVideo = IBlockData<{
  src: string;
  controls: boolean;
  muted?: boolean;
  poster?: string;
}>;

export const Video: IBlock<IVideo> = {
  name: '视频',
  type: BasicType.VIDEO,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
