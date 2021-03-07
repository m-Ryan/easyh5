import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@VisualEditor/typings';
import { BasicType } from '@VisualEditor/constants';

export type IAudio = INodeItem<{
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
