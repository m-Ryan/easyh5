import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IInput } from '..';
import { useField } from 'formik';
import { TextField } from '@/components/Form';
import Draggable from '@VisualEditor/components/Draggable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IInput>(props.idx);
  return (
    <Draggable idx={props.idx} data={value}>
      <div><TextField {...value.data.value} /></div>
    </Draggable>
  );
}
