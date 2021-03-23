import React from 'react';
import { IBlockData } from '@/typings';
import { useField } from 'formik';
import Moveable from '@/components/core/wrapper/Moveable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IBlockData<{}>>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <span>{value.data.value}</span>
    </Moveable>
  );
}
