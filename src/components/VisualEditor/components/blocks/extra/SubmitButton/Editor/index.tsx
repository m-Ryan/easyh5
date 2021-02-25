import React from 'react';
import { ISubmitBtn } from '..';
import { useField } from 'formik';
import Draggable from '@VisualEditor/components/Draggable';
import { useFormContext } from '@VisualEditor/context/FormContext';
import { Button } from 'antd';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<ISubmitBtn>(props.idx);
  const fieldProps = value.data.value;

  const { handleSubmit } = useFormContext();

  return (
    <Draggable idx={props.idx} data={value}>
      <div><Button onClick={handleSubmit} {...fieldProps}>{fieldProps.title}</Button></div>
    </Draggable>
  );
}
