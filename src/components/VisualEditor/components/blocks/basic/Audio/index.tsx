import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IAudio = INodeItem<{
  src: string;
  controls: boolean;
  autoplay: boolean;
  loop: boolean;
}>;

export const Audio = {
  name: '音频',
  type: BlockType.AUDIO,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
