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
      <Picture src={element.data.value} />
    </DragNode>
  );
}
