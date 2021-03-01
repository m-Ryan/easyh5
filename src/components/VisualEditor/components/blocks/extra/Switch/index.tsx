import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type ISwitch = INodeItem<{
  label: string;
  name: string;
  defaultValue?: boolean;
  checkedText: string;
  uncheckedText: string;
}>;

export const Switch = {
  name: '开关',
  type: BlockType.SWITCH,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
