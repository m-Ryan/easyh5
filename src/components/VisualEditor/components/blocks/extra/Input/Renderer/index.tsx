import React from 'react';
import { IInput } from '..';
import { useField } from 'formik';
import { TextField } from '@/components/Form';
import { useFormContext } from '@VisualEditor/context/FormContext';
import { getValidation } from '@VisualEditor/utils/validation';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  const { maxLength, ...fieldProps } = value.data.value;
  const { getFieldName } = useFormContext();
  return (
    <div data-node-type={value.type} data-node-idx={props.idx} style={value.style}>
      <TextField {...fieldProps} validate={getValidation(fieldProps.validate)} name={getFieldName(fieldProps.name)} />
    </div>
  );
}
