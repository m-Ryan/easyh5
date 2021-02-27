import React from 'react';
import { IInput } from '..';
import { useField } from 'formik';
import { TextAreaField, TextField } from '@/components/Form';
import Draggable from '@VisualEditor/components/Draggable';
import { useFormContext } from '@VisualEditor/context/FormContext';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  const { maxLength, validate, type, ...fieldProps } = value.data.value;
  const { getFieldName } = useFormContext();
  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        {
          type === 'textarea'
            ? <TextAreaField {...fieldProps} maxLength={0} name={getFieldName(fieldProps.name)} />
            : <TextField type={type} {...fieldProps} maxLength={0} name={getFieldName(fieldProps.name)} />
        }

      </div>
    </Draggable>
  );
}
