import React from 'react';
import { IInput } from '..';
import { useField } from 'formik';
import { TextAreaField, TextField } from '@/components/core/Form';
import Draggable from '@/components/core/wrapper/Draggable';
import { useForm } from '@/hooks/useForm';
import { getValidation, ValidationType } from '@/utils/validation';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  const { maxLength, type, minLength, ...fieldProps } = value.data.value;
  const { getFieldName } = useForm();
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  if (minLength && minLength > 0) {
    validations.push(`${ValidationType.MIN_LENGTH}:${minLength}`);
  }

  return (
    <Draggable idx={props.idx}>
      <div>
        {
          type === 'textarea'
            ? (
              <TextAreaField
                {...fieldProps}
                validate={undefined}
                required={validations.includes(ValidationType.REQUIRED)} name={getFieldName(fieldProps.name)}
              />
            )
            : (
              <TextField
                {...fieldProps}
                validate={undefined}
                required={validations.includes(ValidationType.REQUIRED)} name={getFieldName(fieldProps.name)}
              />
            )
        }

      </div>
    </Draggable>
  );
}
