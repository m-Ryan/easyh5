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
          label: '输入框',
          placeholder: '请输入',
          validate: [],
          maxLength: 0,
          minLength: -1,
          name: 'xxx',
          type: 'text'
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
