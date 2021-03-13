import { FormType } from '@/constants';
import { CreateInstance } from '@/typings';
import { ValidationType } from '@/utils/validation';
import { merge } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { IForm } from '.';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Radio } from '../Radio';
import { SubmitButton } from '../SubmitButton';
import { Switch } from '../Switch';

export const createInstance: CreateInstance<IForm> = (payload) => {
  const uid = uuidv4().replace(/-/g, '');
  const defaultData: IForm = {
    type: FormType.FORM,
    data: {
      value: {
        uid,
        name: `表单-${uid}`
      },
    },
    style: {
      position: 'relative',
      width: 'auto',
      height: 'auto',
      backgroundColor: '#fafafa',
      borderRadius: '0px',
      paddingRight: '16px',
      paddingLeft: '16px',
      paddingTop: '16px',
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
      Checkbox.createInstance({}),
      Radio.createInstance({}),
      Switch.createInstance({
        data: {
          value: {
            name: 'private',
            label: '匿名提交',
            defaultValue: true,
          }
        },
      }),
      SubmitButton.createInstance({
        data: {
          value: {
            title: '提交'
          },
          action: `formSubmit-${uid}`,
        }
      })
    ],
  };
  return merge(
    defaultData,
    payload
  );
};
