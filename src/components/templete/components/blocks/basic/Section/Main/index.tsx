import React from 'react';
import _ from 'lodash';
import { DragNode } from '../../../../../drag-node';
import { IText } from '../../Text';
import { useField } from 'formik';
import { INodeItem } from '@/components/templete/templete.type';
type IProps = {
  index: string;
};

export function Main(props: IProps) {
  const name = props.index;
  const [field, meta, helpers] = useField<INodeItem<IText>>(name);
  return (
    <section style={field.value.style}>{field.value.data.value}</section>
  );
}
