import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IText } from '.';

export const createInstance: CreateInstance<IText> = (payload = {}) => {
  return merge(
    {
      type: BlockType.TEXT,
      data: {
        value: '可视化编辑器是MediaWiki扩展程序',
      },
      style: {
        width: '100%',
        zIndex: 1,
        position: 'relative',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        color: '#000',
        fontSize: '14px',
        display: 'inline-block',
        left: 0,
        top: 0,
      },
      children: [],
    },
    payload
  );
};
