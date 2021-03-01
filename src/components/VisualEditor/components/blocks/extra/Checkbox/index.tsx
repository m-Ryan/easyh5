import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type ICheckbox = INodeItem<{
  label: string;
  name: string;
  defaultValue: any[];
  options: Array<{ label: string; value: string; }>;
  vertical?: boolean;
}>;

export const Checkbox = {
  name: '多选框',
  type: BlockType.CHECKBOX,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
