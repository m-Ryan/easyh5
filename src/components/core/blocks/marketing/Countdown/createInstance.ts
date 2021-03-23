import { MarketingType } from '@/constants';
import { CreateInstance } from '@/typings';
import dayjs from 'dayjs';
import { merge } from 'lodash';
import { ICountdown } from '.';

export const createInstance: CreateInstance<ICountdown> = (payload) => {
  const defaultData: ICountdown = {
    type: MarketingType.COUNTDOWN,
    data: {
      value: {
        endTime: dayjs().add(2, 'hour').toString(),
        type: 'date',
        gridColor: 'rgb(244, 67, 54)',
        gridBgColor: '#fff',
      }
    },
    style: {
      display: 'inline-flex',
      zIndex: 1,
      position: 'relative',
      fontSize: '14px',
      left: 0,
      top: 0,
    },
    children: [],
  };
  return merge(
    defaultData,
    payload
  );
};
