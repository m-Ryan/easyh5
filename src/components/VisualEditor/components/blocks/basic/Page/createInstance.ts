import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IPage } from '.';

export const createInstance: CreateInstance<IPage> = (payload) => {
  return merge(
    {
      type: BlockType.PAGE,
      data: {
        value: null,
      },
      style: {
        width: '100%',
        height: 'auto',
        minHeight: '100%',
        backgroundColor: '#fff',
        position: 'relative',
        fontSize: '14px',
      },
      children: [],
    },
    payload
  );
};
