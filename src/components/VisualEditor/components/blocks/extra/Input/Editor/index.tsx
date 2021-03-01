import React from 'react';
import { IInput } from '..';
import { useField } from 'formik';
import { TextAreaField, TextField } from '@/components/Form';
import Draggable from '@VisualEditor/components/Draggable';
import { useFormContext } from '@VisualEditor/context/FormContext';
import { getValidation, ValidationType } from '@VisualEditor/utils/validation';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  const { maxLength, type, minLength, ...fieldProps } = value.data.value;
  const { getFieldName } = useFormContext();
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  if (minLength && minLength > 0) {
    validations.push(`${ValidationType.MIN_LENGTH}:${minLength}`);
  }

  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        {
          type === 'textarea'
            ? (
              <TextAreaField
                {...fieldProps}
                validate={getValidation(validations)}
                required={validations.includes(ValidationType.REQUIRED)} name={getFieldName(fieldProps.name)}
              />
            )
            : (
              <TextField
                {...fieldProps}
                validate={getValidation(validations)}
                required={validations.includes(ValidationType.REQUIRED)} name={getFieldName(fieldProps.name)}
              />
            )
        }

      </div>
    </Draggable>
  );
}
