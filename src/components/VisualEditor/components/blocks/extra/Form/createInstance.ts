import { BlockType } from '@VisualEditor/constants';
import { CreateInstance } from '@VisualEditor/typings';
import { ValidationType } from '@VisualEditor/utils/validation';
import { merge } from 'lodash';
import { IForm } from '.';
import { Input } from '../Input';
import { SubmitButton } from '../SubmitButton';

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
        paddingRight: '16px',
        paddingLeft: '16px',
        opacity: 1,
      },
      children: [
        Input.createInstance({
          data: {
            value: {
              label: '姓名',
              name: 'name',
              placeholder: '请输入姓名',
              type: 'text',
              minLength: 3,
              validate: [ValidationType.REQUIRED]
            }
          }
        }),
        Input.createInstance({
          data: {
            value: {
              label: '邮箱',
              name: 'email',
              placeholder: '请输入邮箱',
              type: 'text',
              validate: [ValidationType.REQUIRED, ValidationType.EMAIL]
            }
          }
        }),
        Input.createInstance({
          data: {
            value: {
              label: '手机号',
              name: 'phone',
              placeholder: '请输入手机号',
              type: 'text',
              validate: [ValidationType.REQUIRED, ValidationType.PHONE]
            }
          }
        }),
        Input.createInstance({
          data: {
            value: {
              label: '描述',
              name: 'description',
              placeholder: '相关描述',
              type: 'textarea',
              validate: []
            }
          }
        }),
        SubmitButton.createInstance({
          data: {
            value: {
              title: '提交'
            }
          }
        })
      ],
    },
    payload
  );
};
