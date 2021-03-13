import React from 'react';
import { INodeItem } from '@/typings';
import { useField } from 'formik';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<INodeItem<{}>>(props.idx);
  return (
    <EditBlockWrapper idx={props.idx}>
      <span>
        {value.data.value}
      </span>
    </EditBlockWrapper>
  );
}
