import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { ISubmitBtn } from '.';

export const createInstance: CreateInstance<ISubmitBtn> = (payload) => {
  return merge(
    {
      type: BlockType.SUBMIT_BTN,
      data: {
        value: {
          title: '提交'
        },
      },
      style: {
        position: 'relative',

      },
      children: [],
    },
    payload
  );
};
