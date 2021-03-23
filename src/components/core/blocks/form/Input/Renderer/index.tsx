import React from 'react';
import { IInput } from '..';
import { useField } from 'formik';
import { TextAreaField, TextField } from '@/components/core/Form';
import { useForm } from '@/hooks/useForm';
import { getValidation, ValidationType } from '@/utils/validation';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  const { maxLength, minLength, type, ...fieldProps } = value.data.value;
  const { getFieldName } = useForm();
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  if (minLength && minLength > 0) {
    validations.push(`${ValidationType.MIN_LENGTH}:${minLength}`);
  }

  return (
    <RenderBlockWrapper idx={props.idx}>
      <div data-node-type={value.type} data-node-idx={props.idx} style={value.style}>

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
    </RenderBlockWrapper>

  );
}
