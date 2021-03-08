import React from 'react';
import { useField } from 'formik';
import { SwitchField } from '@/components/core/Form';
import Draggable from '@/components/core/wrapper/Draggable';
import { ISwitch } from '..';
import { useFormContext } from '@/context/FormContext';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const { getFieldName } = useFormContext();
  const [{ value }] = useField<ISwitch>(props.idx);

  const { checkedText, uncheckedText, ...fieldProps } = value.data.value;

  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        <SwitchField checkedChildren={checkedText} unCheckedChildren={uncheckedText} {...fieldProps} name={getFieldName(fieldProps.name)} inline />
      </div>
    </Draggable>
  );
}
