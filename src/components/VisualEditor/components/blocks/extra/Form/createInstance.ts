import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IForm } from '.';
import { Input } from '../Input';

export const createInstance: CreateInstance<IForm> = (payload) => {
  return merge(
    {
      type: BlockType.FORM,
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
      children: [
        Input.createInstance(),
        Input.createInstance(),
        Input.createInstance()
      ],
    },
    payload
  );
};
