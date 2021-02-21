import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IForm = INodeItem<null>;

export const Form = {
  name: '表单',
  type: BlockType.FORM,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
