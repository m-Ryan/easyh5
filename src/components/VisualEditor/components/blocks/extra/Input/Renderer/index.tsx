import React from 'react';
import { IInput } from '..';
import { useField } from 'formik';
import { TextField } from '@/components/Form';
import { useFormContext } from '@VisualEditor/context/FormContext';
import { getValidation, ValidationType } from '@VisualEditor/utils/validation';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  const { maxLength, minLength, ...fieldProps } = value.data.value;
  const { getFieldName } = useFormContext();
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  if (minLength && minLength > 0) {
    validations.push(`${ValidationType.MIN_LENGTH}:${minLength}`);
  }
  return (
    <div data-node-type={value.type} data-node-idx={props.idx} style={value.style}>
      <TextField {...fieldProps} validate={getValidation(validations)} name={getFieldName(fieldProps.name)} />
    </div>
  );
}
