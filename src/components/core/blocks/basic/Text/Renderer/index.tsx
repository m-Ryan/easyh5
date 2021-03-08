import React from 'react';
import { INodeItem } from '@/typings';
import { useField } from 'formik';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<INodeItem<{}>>(props.idx);
  return <span data-node-type={value.type} data-node-idx={props.idx} style={value.style}>{value.data.value}</span>;
}
