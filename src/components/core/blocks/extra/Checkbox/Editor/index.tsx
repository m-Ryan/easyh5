import React from 'react';
import { useField } from 'formik';
import { CheckboxField } from '@/components/core/Form';
import Draggable from '@/components/core/wrapper/Draggable';
import { ICheckbox } from '..';
import { useFormContext } from '@/context/FormContext';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const { getFieldName } = useFormContext();
  const [{ value }] = useField<ICheckbox>(props.idx);
  const { ...fieldProps } = value.data.value;

  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        <CheckboxField alignment="leading" {...fieldProps} name={getFieldName(fieldProps.name)} />
      </div>
    </Draggable>
  );
}
