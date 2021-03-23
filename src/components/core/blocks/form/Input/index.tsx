import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, IBlockData } from '@/typings';
import { FormType } from '@/constants';

export type IInput = IBlockData<{
  label: string;
  name: string;
  type: 'text' | 'password' | 'number' | 'textarea';
  placeholder?: string;
  maxLength?: number,
  minLength?: number,
  validate?: string[];
}>;

export const Input: IBlock<IInput> = {
  name: '输入框',
  type: FormType.INPUT,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
