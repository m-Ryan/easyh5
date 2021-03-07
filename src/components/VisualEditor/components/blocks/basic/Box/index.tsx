import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { INodeItem } from '@VisualEditor/typings';
import { BasicType, FormType } from '@VisualEditor/constants';

export type IBox = INodeItem<null>;

export const Box = {
  name: '容器',
  type: BasicType.BOX,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType).filter(type => ![BasicType.SECTION].includes(type)),
    FormType.FORM
  ]
};
