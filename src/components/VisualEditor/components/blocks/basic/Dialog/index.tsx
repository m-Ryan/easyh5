import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IDialog = INodeItem<{
  uid: string;
  name: string;

}>;

export const Dialog = {
  name: '弹窗',
  type: BlockType.DIALOG,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
