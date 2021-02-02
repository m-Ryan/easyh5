import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { useField } from 'formik';
import Moveable from '@VisualEditor/components/Moveable';

type IProps = {
  idx: string;
};

export function Edit(props: IProps) {
  const [{ value },] = useField<INodeItem<{}>>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <span>{value.data.value}</span>
    </Moveable>

  );
}
