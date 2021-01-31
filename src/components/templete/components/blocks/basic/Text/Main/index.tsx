import React from 'react';
import _ from 'lodash';
import { useField } from 'formik';
import { INodeItem } from '@/components/templete/templete.type';
import Moveable from '@/components/templete/components/Moveable';
type IProps = {
  idx: string;
};

export function Main(props: IProps) {
  const [{ value },] = useField<INodeItem<{}>>(props.idx);
  return (
    <Moveable idx={props.idx} data={value}>
      <span>{value.data.value}</span>
    </Moveable>

  );
}
