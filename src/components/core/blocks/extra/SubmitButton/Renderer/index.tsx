import React from 'react';
import { ISubmitBtn } from '..';
import { useField } from 'formik';
import { BlockWrapper } from '@/components/core/wrapper/BlockWrapper';
import { useFormContext } from '@/context/FormContext';
import { Button } from 'antd';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<ISubmitBtn>(props.idx);
  const fieldProps = value.data.value;

  const { handleSubmit, isTouched } = useFormContext();

  return (
    <BlockWrapper idx={props.idx}>
      <div><Button disabled={!isTouched} type="primary" style={{ width: '100%' }} onClick={handleSubmit} {...fieldProps}>{fieldProps.title}</Button></div>
    </BlockWrapper>
  );
}
