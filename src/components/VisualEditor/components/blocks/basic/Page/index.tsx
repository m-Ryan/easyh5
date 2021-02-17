import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BlockType } from '@VisualEditor/constants';

export type IPage = INodeItem<{
  title: string;
  dialogs: INodeItem[];
  h5: {
    enabled: boolean;
    pageWidth: number;
    pageMaxWidth: number;
  };
}>;

export const Page = {
  name: '页面',
  type: BlockType.PAGE,
  Editor,
  Renderer,
  Panel,
  createInstance,
};
