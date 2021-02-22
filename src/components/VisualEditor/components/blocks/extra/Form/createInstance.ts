import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { merge } from 'lodash';
import { IForm } from '.';
import { Input } from '../Input';

export const createInstance: CreateInstance<IForm> = (payload) => {
  return merge(
    {
      type: BlockType.FORM,
      data: {
        value: null,
      },
      style: {
        position: 'relative',
        width: 'auto',
        height: 'auto',
        backgroundColor: '#fafafa',
        borderRadius: '0px',
        opacity: 1,
      },
      children: [
        Input.createInstance({
          data: {
            value: {
              label: '姓名',
              name: 'name',
              placeholder: '请输入姓名',
              type: 'text'
            }
          }
        }),
        Input.createInstance({
          data: {
            value: {
              label: '邮箱',
              name: 'email',
              placeholder: '请输入邮箱',
              type: 'text'
            }
          }
        }),
        Input.createInstance({
          data: {
            value: {
              label: '手机号',
              name: 'phone',
              placeholder: '请输入手机号',
              type: 'text'
            }
          }
        })
      ],
    },
    payload
  );
};
