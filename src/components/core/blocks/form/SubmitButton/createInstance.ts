import { FormType } from '@/constants';
import { CreateInstance } from '@/typings';
import { merge } from 'lodash';
import { ISubmitBtn } from '.';

export const createInstance: CreateInstance<ISubmitBtn> = (payload) => {
  const defaultData: ISubmitBtn = {
    type: FormType.SUBMIT_BTN,
    data: {
      value: {
        title: '提交'
      },
    },
    style: {
      position: 'relative',

    },
    children: [],
  };
  return merge(
    defaultData,
    payload
  );
};
