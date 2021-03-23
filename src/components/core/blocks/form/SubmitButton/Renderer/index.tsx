import React from 'react';
import { ISubmitBtn } from '..';
import { useField } from 'formik';
import { Button } from 'antd';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<ISubmitBtn>(props.idx);
  const fieldProps = value.data.value;

  return (
    <RenderBlockWrapper idx={props.idx}>
      <div><Button type="primary" style={{ width: '100%' }} {...fieldProps}>{fieldProps.title}</Button></div>
    </RenderBlockWrapper>
  );
}
