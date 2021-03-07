import React from 'react';
import { IRadio } from '..';
import { useField } from 'formik';
import { RadioGroupField } from '@VisualEditor/components/core/Form';
import { BlockWrapper } from '@VisualEditor/components/core/wrapper/BlockWrapper';
import { getValidation, ValidationType } from '@VisualEditor/utils/validation';
import { useFormContext } from '@VisualEditor/context/FormContext';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const { getFieldName } = useFormContext();
  const [{ value }] = useField<IRadio>(props.idx);
  const { ...fieldProps } = value.data.value;
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  return (
    <BlockWrapper idx={props.idx}>
      <div>
        <RadioGroupField
          alignment="leading"
          style={{ display: 'flex', flexDirection: 'column' }}
          {...fieldProps}
          validate={getValidation(validations)}
          name={getFieldName(fieldProps.name)}
          required={validations.includes(ValidationType.REQUIRED)}
          inline
        />
      </div>
    </BlockWrapper>

  );
}
