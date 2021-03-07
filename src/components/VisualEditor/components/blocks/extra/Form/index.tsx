import { Panel } from './Panel';
import { Renderer } from './Renderer';
import { Editor } from './Editor';
import { createInstance } from './createInstance';
import { IBlock, INodeItem } from '@VisualEditor/typings';
import { BasicType, FormType } from '@VisualEditor/constants';

export type IForm = INodeItem<{}>;

export const Form: IBlock<IForm> = {
  name: '表单',
  type: FormType.FORM,
  Editor,
  Renderer,
  Panel,
  createInstance,
  validChildrenType: [
    ...Object.values(FormType).filter(item => item === FormType.FORM),
    ...Object.values(BasicType).filter(type => ![BasicType.SECTION].includes(type)),]
};
