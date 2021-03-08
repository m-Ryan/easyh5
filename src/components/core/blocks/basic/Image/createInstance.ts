import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IImage } from '.';

export const createInstance: CreateInstance<IImage> = (payload) => {
  const defaultData: IImage = {
    type: BasicType.IMAGE,
    data: {
      value: 'http://assets.maocanhua.cn/FkWeSH88STspyZduGtyjYMt4InP4',
    },
    style: {
      position: 'relative',
      left: 0,
      top: 0,
      width: '100%',
      height: 'auto',
    },
    children: [],
  };
  return merge(
    defaultData,
    payload
  );
};
