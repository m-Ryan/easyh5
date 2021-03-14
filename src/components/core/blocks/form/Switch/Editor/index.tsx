import React from 'react';
import { useField } from 'formik';
import { SwitchField } from '@/components/core/Form';
import Draggable from '@/components/core/wrapper/Draggable';
import { ISwitch } from '..';
import { useForm } from '@/hooks/useForm';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const { getFieldName } = useForm();
  const [{ value }] = useField<ISwitch>(props.idx);

  const { checkedText, uncheckedText, ...fieldProps } = value.data.value;

  return (
    <Draggable idx={props.idx}>
      <div>
        <SwitchField checkedChildren={checkedText} unCheckedChildren={uncheckedText} {...fieldProps} name={getFieldName(fieldProps.name)} inline />
      </div>
    </Draggable>
  );
}
