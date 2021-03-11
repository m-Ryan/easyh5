import { FormType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { IInput } from '.';

export const createInstance: CreateInstance<IInput> = (payload) => {
  const defaultData: IInput = {
    type: FormType.INPUT,
    data: {
      value: {
        label: '输入框',
        placeholder: '请输入',
        validate: [],
        maxLength: 0,
        minLength: -1,
        name: 'xxx',
        type: 'text'
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
