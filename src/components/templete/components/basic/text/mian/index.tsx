import React from 'react';
import _ from 'lodash';
import { DragNode } from '../../../../drag-node';
import { IText } from '../../text';
type IProps = {
	element: IText;
};

export function Main(props: IProps) {
  const { element } = props;

  return (
    <DragNode {...props}>
      <span>{element.data.value}</span>
    </DragNode>
  );
}
