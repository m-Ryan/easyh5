import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { FormType } from '@/constants';

export type ISwitch = IBlockData<{
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
