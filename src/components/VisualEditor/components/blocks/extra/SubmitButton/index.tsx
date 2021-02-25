import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type ISubmitBtn = INodeItem<{
  title: string;
}>;

export const SubmitButton = {
  name: '提交按钮',
  type: BlockType.SUBMIT_BTN,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
