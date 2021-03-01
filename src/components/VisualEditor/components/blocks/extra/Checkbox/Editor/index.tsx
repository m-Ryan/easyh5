import React from 'react';
import { useField } from 'formik';
import { CheckboxField } from '@/components/Form';
import Draggable from '@VisualEditor/components/Draggable';
import { ICheckbox } from '..';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<ICheckbox>(props.idx);
  const { ...fieldProps } = value.data.value;

  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        <CheckboxField alignment="leading" {...fieldProps} name={`${props.idx}.data.value.defaultValue`} />
      </div>
    </Draggable>
  );
}
