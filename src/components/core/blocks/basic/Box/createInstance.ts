import { BasicType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IBox } from '.';

export const createInstance: CreateInstance<IBox> = (payload) => {
  const defaultData: IBox = {
    type: BasicType.BOX,
    data: {
      value: null,
    },
    style: {
      position: 'relative',
      width: '100%',
      height: '200px',
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      marginTop: 0,
      marginRight: 0,
      marginBottom: 0,
      marginLeft: 0,
      opacity: 1,
    },
    children: [],
  };
  return merge(
    defaultData,
    payload
  );
};
