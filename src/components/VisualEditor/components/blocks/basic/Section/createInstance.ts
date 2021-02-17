import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { ISection } from '.';

export const createInstance: CreateInstance<ISection> = (payload) => {
  return merge(
    {
      type: BlockType.SECTION,
      data: {
        value: null,
      },
      style: {
        position: 'relative',
        width: '100%',
        height: 100,
        backgroundColor: '#fafafa',
      },
      children: [],
    },
    payload
  );
};
