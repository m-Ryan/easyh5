import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IRadio = INodeItem<{
  label: string;
  name: string;
  defaultValue: any;
  validate?: string[];
  options: Array<{ label: string; value: string; }>;
  vertical?: boolean;
}>;

export const Radio = {
  name: '单选框',
  type: BlockType.RADIO,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
