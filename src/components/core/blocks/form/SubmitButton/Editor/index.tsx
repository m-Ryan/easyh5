import React from 'react';
import { ISubmitBtn } from '..';
import { useField } from 'formik';
import Draggable from '@/components/core/wrapper/Draggable';
import { Button } from 'antd';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<ISubmitBtn>(props.idx);
  const fieldProps = value.data.value;

  return (
    <Draggable idx={props.idx}>
      <div><Button type="primary" style={{ width: '100%' }} {...fieldProps}>{fieldProps.title}</Button></div>
    </Draggable>
  );
}
