import React from 'react';
import _ from 'lodash';

import { useField, FieldArray, FormikProps, Formik } from 'formik';
import { DragNode } from '../../../../drag-node';
import { IBitmap } from '../../bitmap';
import { Picture } from '@/components/Picture';
import { INodeItem } from '@/components/templete/templete.type';

type IProps = {
  index: string;
};

export function Main(props: IProps) {
  const name = `content.${props.index}`;
  const [field, meta, helpers] = useField<INodeItem<IBitmap>>(name);

  return (
    <DragNode name={name}>
      <img src={field.value.data.value + '?imageView2/3/q/70/w/750/format/webp'} />
    </DragNode>
  );
}
