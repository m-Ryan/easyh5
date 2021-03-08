import React from 'react';
import { INodeItem } from '@/typings';
import { useField } from 'formik';
import Moveable from '@/components/core/wrapper/Moveable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<INodeItem<{}>>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <span>{value.data.value}</span>
    </Moveable>
  );
}
