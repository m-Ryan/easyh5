import React from 'react';
import { useField } from 'formik';
import { RadioGroupField } from '@/components/core/Form';
import Draggable from '@/components/core/wrapper/Draggable';
import { IRadio } from '..';
import { useFormContext } from '@/context/FormContext';
import { getValidation, ValidationType } from '@/utils/validation';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const { getFieldName } = useFormContext();
  const [{ value }] = useField<IRadio>(props.idx);
  const { ...fieldProps } = value.data.value;
  const validations = fieldProps.validate ? [...fieldProps.validate] : [];
  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        <RadioGroupField
          alignment="leading"
          {...fieldProps}
          validate={getValidation(validations)}
          required={validations.includes(ValidationType.REQUIRED)}
          name={getFieldName(fieldProps.name)}
        />
      </div>
    </Draggable>
  );
}
