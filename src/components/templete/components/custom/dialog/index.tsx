import { Config } from './config';
import { Main } from './main';
import { Preview } from './preview';
import { INodeItem } from '@/components/templete/templete.type';
import { CreateElement } from '@/modal/useArticle';
import _ from 'lodash';
import json from './dialog.json';
import { CustomComponentType } from '@/components/templete/constants';
export type IDialog = INodeItem<{ title: string; uid: number; maskClose: boolean }>;

const type = CustomComponentType.Dialog;

const create = (): CreateElement<IDialog> => {
  const nodeItem = _.cloneDeep<any>(json) as IDialog;
  return {
    nodeItem: nodeItem
  };
};

export const Dialog = {
  Config,
  Main,
  Preview,
  type,
  create
};
