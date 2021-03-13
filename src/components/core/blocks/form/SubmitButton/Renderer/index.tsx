import React from 'react';
import { ISubmitBtn } from '..';
import { useField } from 'formik';
import { useFormContext } from '@/context/FormContext';
import { Button } from 'antd';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<ISubmitBtn>(props.idx);
  const fieldProps = value.data.value;

  const { handleSubmit, isTouched } = useFormContext();

  return (
    <RenderBlockWrapper idx={props.idx}>
      <div><Button disabled={!isTouched} type="primary" style={{ width: '100%' }} onClick={handleSubmit} {...fieldProps}>{fieldProps.title}</Button></div>
    </RenderBlockWrapper>
  );
}
