import React from 'react';
import { IBlockData } from '@/typings';
import { useField } from 'formik';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IBlockData<{}>>(props.idx);
  return (
    <RenderBlockWrapper idx={props.idx}>
      <span>
        {value.data.value}
      </span>
    </RenderBlockWrapper>
  );
}
