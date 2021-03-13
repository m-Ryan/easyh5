import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@/typings';
import { BasicType, FormType } from '@/constants';

export type IBox = INodeItem<null>;

export const Box = {
  name: '容器',
  type: BasicType.BOX,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType),
    FormType.FORM
  ]
};
