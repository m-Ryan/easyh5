import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { FormType } from '@/constants';

export type IRadio = IBlockData<{
  label: string;
  name: string;
  defaultValue: any;
  validate?: string[];
  options: Array<{ label: string; value: string; }>;
  vertical?: boolean;
}>;

export const Radio: IBlock<IRadio> = {
  name: '单选框',
  type: FormType.RADIO,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
