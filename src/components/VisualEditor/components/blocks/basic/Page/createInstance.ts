import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IPage } from '.';

export const createInstance: CreateInstance<IPage> = (payload = {}) => {
  return merge(
    {
      type: BlockType.PAGE,
      data: {
        value: {
          title: '页面一',
          dialogs: [],
          h5: {
            enabled: true,
            pageWidth: 375,
            pageMaxWidth: 375,
          }
        },
      },
      style: {
        width: '100%',
        height: 'auto',
        minHeight: '100%',
        backgroundColor: '#fff',
        overflow: 'auto',
        position: 'relative',
        fontSize: '14px',
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      children: [],
    },
    payload
  );
};
