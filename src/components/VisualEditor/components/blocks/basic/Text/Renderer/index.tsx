import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { useField } from 'formik';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<INodeItem<{}>>(props.idx);
  return <span style={value.style}>{value.data.value}</span>;
}
