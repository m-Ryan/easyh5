import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IBox } from '.';

export const createInstance: CreateInstance<IBox> = (payload) => {
  return merge(
    {
      type: BlockType.BOX,
      data: {
        value: null,
      },
      style: {
        position: 'relative',
        width: 'auto',
        height: '100px',
        backgroundColor: '#fafafa',
        borderRadius: '0px',
        opacity: 1,
      },
      children: [],
    },
    payload
  );
};
