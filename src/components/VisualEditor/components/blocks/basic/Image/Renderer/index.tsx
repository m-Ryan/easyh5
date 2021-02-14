import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IImage } from '..';
import { useField } from 'formik';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<INodeItem<IImage>>(props.idx);
  return (
    <img
      data-node-type={field.value.type} data-node-idx={props.idx}
      style={field.value.style}
      src={field.value.data.value + '?imageView2/3/q/70/w/750/format/webp'}
    />
  );
}
