import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { FormType } from '@/constants';

export type ICheckbox = IBlockData<{
  label: string;
  name: string;
  defaultValue: any[];
  options: Array<{ label: string; value: string; }>;
  vertical?: boolean;
}>;

export const Checkbox: IBlock<ICheckbox> = {
  name: '多选框',
  type: FormType.CHECKBOX,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
