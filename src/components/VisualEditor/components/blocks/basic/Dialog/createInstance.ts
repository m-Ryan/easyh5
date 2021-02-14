import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { v4 as uuidv4 } from 'uuid';
import { merge } from 'lodash';
import { IDialog } from '.';
import { Box } from '../Box';

export const createInstance: CreateInstance<IDialog> = (payload) => {
  return merge(
    {
      type: BlockType.DIALOG,
      data: {
        value: {
          name: '新建弹窗',
          maskClose: true,
          uid: uuidv4().replace(/-/g, '')
        },
      },
      style: {
        'zIndex': '9999',
        'backgroundSize': '100%',
        'opacity': '1',
        'position': 'absolute',
        'left': '50%',
        'top': 0,
        'transform': 'translate(-50%, 0)',
        'width': '375px',
        'height': '667px',
        'transformOrigin': '187.5px 333.5px',
        'backgroundColor': 'rgba(0, 0, 0, 0.8)',
        'fontSize': '12px',
        'color': 'rgb(0, 0, 0)',
        'lineHeight': 'normal',
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'flexDirection': 'column'
      },
      children: [
        Box.createInstance({
          style: {
            'zIndex': 1,
            'position': 'relative',
            'backgroundSize': '100%',
            'left': 0,
            'top': 0,
            'width': 350,
            'height': 200,
            'opacity': 1,
            'backgroundColor': 'rgba(255, 255, 255, 1)',
            'fontSize': 14,
            'borderRadius': 20
          }
        })
      ],
    },
    payload
  );
};

