import React from 'react';
import _ from 'lodash';
import { DragNode } from '../../../../drag-node';
import { IBitmap } from '../../bitmap';
import { Picture } from '@/components/Picture';
type IProps = {
	element: IBitmap;
};

export function Main(props: IProps) {
  const { element } = props;
  return (
    <DragNode {...props}>
      <img src={element.data.value+'?imageView2/3/q/70/w/750/format/webp'} />
    </DragNode>
  );
}
