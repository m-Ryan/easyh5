import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IInput = INodeItem<{
  label: string;
  name: string;
  type: 'text' | 'password' | 'number';
  placeholder?: string;
  maxLength?: number,
  minLength?: number,
  validate?: string[];
}>;

export const Input = {
  name: '输入框',
  type: BlockType.INPUT,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
