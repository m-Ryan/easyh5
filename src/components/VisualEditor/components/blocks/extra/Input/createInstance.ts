import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IInput } from '.';

export const createInstance: CreateInstance<IInput> = (payload) => {
  return merge(
    {
      type: BlockType.INPUT,
      data: {
        value: {

        },
      },
      style: {
        position: 'relative',
        opacity: 1,
      },
      children: [],
    },
    payload
  );
};
