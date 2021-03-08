import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { v4 as uuidv4 } from 'uuid';
import { merge } from 'lodash';
import { IDialog } from '.';
import { Box } from '../Box';

export const createInstance: CreateInstance<IDialog> = (payload) => {
  const uid = uuidv4().replace(/-/g, '');

  const defaultData: IDialog = {
    type: BasicType.DIALOG,
    data: {
      value: {
        name: '新建弹窗',
        uid: uid,
      },
    },
    style: {
      'zIndex': 9999,
      'backgroundSize': '100%',
      'opacity': '1',
      'position': 'absolute',
      'left': '50%',
      'top': 0,
      'transform': 'translate(-50%, 0)',
      'width': '100%',
      'height': '100%',
      'transformOrigin': '187.5px 333.5px',
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
          'position': 'absolute',
          'backgroundSize': '100%',
          'left': 0,
          'top': 0,
          'width': '100%',
          'height': '100%',
          'backgroundColor': 'rgba(0, 0, 0, 0.8)',
          'fontSize': 14,
        },
        data: {
          action: `dialogClose-${uid}`,
          value: null
        }
      }),
      Box.createInstance({
        style: {
          'zIndex': 10,
          'position': 'relative',
          'backgroundSize': '100%',
          'left': 0,
          'top': 0,
          'width': 350,
          'height': 200,
          'backgroundColor': 'rgba(255, 255, 255, 1)',
          'fontSize': 14,
        },

      })
    ],
  };

  return merge(
    defaultData,
    payload
  );
};

