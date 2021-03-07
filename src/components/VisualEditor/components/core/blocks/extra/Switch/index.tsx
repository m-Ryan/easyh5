import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@VisualEditor/typings';
import { FormType } from '@VisualEditor/constants';

export type ISwitch = INodeItem<{
  label: string;
  name: string;
  defaultValue?: boolean;
  checkedText: string;
  uncheckedText: string;
}>;

export const Switch: IBlock<ISwitch> = {
  name: '开关',
  type: FormType.SWITCH,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
