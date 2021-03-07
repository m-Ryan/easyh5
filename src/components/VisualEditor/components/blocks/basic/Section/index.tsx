import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@VisualEditor/typings';
import { BasicType, FormType } from '@VisualEditor/constants';

export type ISection = INodeItem<null>;

export const Section: IBlock<ISection> = {
  name: '编组',
  type: BasicType.SECTION,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(BasicType).filter(type => ![BasicType.SECTION].includes(type)),
    FormType.FORM
  ]
};
