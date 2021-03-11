import { FormType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ISwitch } from '.';

export const createInstance: CreateInstance<ISwitch> = (payload) => {

  const defaultData: ISwitch = {
    type: FormType.SWITCH,
    data: {
      value: {
        label: '开关',
        name: 'switch',
        defaultValue: false,
        checkedText: '开启',
        uncheckedText: '关闭'
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
