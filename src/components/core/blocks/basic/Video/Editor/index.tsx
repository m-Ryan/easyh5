import React from 'react';
import { IVideo } from '..';
import { useField } from 'formik';
import Moveable from '@/components/core/wrapper/Moveable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IVideo>(props.idx);
  return (
    <Moveable idx={props.idx}>

      <video {...value.data.value} />

    </Moveable>
  );
}
