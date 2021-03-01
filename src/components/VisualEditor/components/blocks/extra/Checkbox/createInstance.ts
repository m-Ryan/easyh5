import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { ICheckbox } from '.';

export const createInstance: CreateInstance<ICheckbox> = (payload) => {

  const defaultData: ICheckbox = {
    type: BlockType.CHECKBOX,
    data: {
      value: {
        label: '爱好',
        name: 'hobby',
        defaultValue: [],
        options: [
          {
            label: '游戏',
            value: 'game'
          },
          {
            label: '看书',
            value: 'reading'
          },
          {
            label: '游泳',
            value: 'swim'
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
