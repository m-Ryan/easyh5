import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { ValidationType } from '@VisualEditor/utils/validation';
import { merge } from 'lodash';
import { IRadio } from '.';

export const createInstance: CreateInstance<IRadio> = (payload) => {

  const defaultData: IRadio = {
    type: BlockType.RADIO,
    data: {
      value: {
        label: '性别',
        name: 'sex',
        defaultValue: '',
        validate: [ValidationType.REQUIRED],
        options: [
          {
            label: '男',
            value: '1'
          },
          {
            label: '女',
            value: '0'
          },
        ]
      },
    },
    style: {
      position: 'relative',
      opacity: 1,
    },
    children: [],
  };

  return merge(
    defaultData,
    payload
  );
};
