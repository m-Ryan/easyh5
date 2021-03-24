import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { v4 as uuidv4 } from 'uuid';
import { merge } from 'lodash';
import { IDialog } from '.';
import { Box } from '../Box';
import { Image } from '../Image';

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
      zIndex: 999,
      backgroundSize: '100%',
      opacity: '1',
      position: 'absolute',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      fontSize: '12px',
      color: 'rgb(0, 0, 0)',
      lineHeight: 'normal',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    children: [
      Box.createInstance({
        style: {
          zIndex: 1,
          position: 'absolute',
          backgroundSize: '100%',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          fontSize: '14px',
          overflowY: 'auto',
        },
        data: {
          action: `dialogClose-${uid}`,
          value: null,
        },
      }),
      Image.createInstance({
        data: {
          value: 'https://assets.maocanhua.cn/FmRBC4V-1mQttute9vHvAhCdKJL2',
          action: `dialogClose-${uid}`,
        },
        style: {
          zIndex: 100,
          position: 'absolute',
          backgroundSize: '100%',
          top: '20px',
          right: '20px',
          width: '25px',
          height: '25px',
          left: '',
          bottom: '',
        },
      }),
      Box.createInstance({
        style: {
          zIndex: 10,
          position: 'relative',
          backgroundSize: '100%',
          left: 0,
          top: 0,
          width: '350px',
          height: '200px',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          fontSize: '14px',
        },
      }),
    ],
  };

  return merge(defaultData, payload);
};
