import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@/typings';
import { FormType } from '@/constants';

export type ISubmitBtn = INodeItem<{
  title: string;
}>;

export const SubmitButton: IBlock<ISubmitBtn> = {
  name: '提交按钮',
  type: FormType.SUBMIT_BTN,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: []
};
