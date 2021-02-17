import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IImage } from '.';

export const createInstance: CreateInstance<IImage> = (payload) => {
  return merge(
    {
      type: BlockType.IMAGE,
      data: {
        value: 'http://assets.maocanhua.cn/FkWeSH88STspyZduGtyjYMt4InP4',
      },
      style: {
        position: 'relative',
        left: 0,
        top: 0,
        width: '100%',
        height: 'auto',
      },
      children: [],
    },
    payload
  );
};
