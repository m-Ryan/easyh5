import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IImage } from '..';
import { useField } from 'formik';
import Moveable from '@VisualEditor/components/Moveable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<INodeItem<IImage>>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <img src={field.value.data.value + '?imageView2/3/q/70/w/750/format/webp'} />
    </Moveable>
  );
}
