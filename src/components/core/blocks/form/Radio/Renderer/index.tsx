import React from 'react';
import { IRadio } from '..';
import { useField } from 'formik';
import { RadioGroupField } from '@/components/core/Form';
import { getValidation, ValidationType } from '@/utils/validation';
import { useForm } from '@/hooks/useForm';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const { getFieldName } = useForm();
  const [{ value }] = useField<IRadio>(props.idx);
  const { ...fieldProps } = value.data.value;
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  return (
    <RenderBlockWrapper idx={props.idx}>
      <div>
        <RadioGroupField
          alignment="leading"
          style={{ display: 'flex', flexDirection: 'column' }}
          {...fieldProps}
          validate={getValidation(validations)}
          name={getFieldName(fieldProps.name)}
          required={validations.includes(ValidationType.REQUIRED)}
        />
      </div>
    </RenderBlockWrapper>

  );
}
