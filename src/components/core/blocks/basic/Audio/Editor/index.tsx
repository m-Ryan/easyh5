import React from 'react';
import { IAudio } from '..';
import { useField } from 'formik';
import Moveable from '@/components/core/wrapper/Moveable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IAudio>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <div>
        <audio autoPlay={value.data.value.autoplay} loop={value.data.value.loop} />
      </div>
    </Moveable>
  );
}
