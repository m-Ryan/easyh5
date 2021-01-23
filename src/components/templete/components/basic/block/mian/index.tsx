import React from 'react';
import _ from 'lodash';
import { DragNode } from '../../../../drag-node';
import { INodeItem } from '@/components/templete/templete.type';
import { IBox } from '../../block';
type IProps = {
	element: IBox;
  renderItem: React.FunctionComponent<{ list: INodeItem[] }>
};

export function Main(props: IProps) {
  const { element, renderItem } = props;
  return (
    <DragNode {...props}>
      <div>
        {element.children.length > 0 ? <props.renderItem list={element.children} /> : null}
      </div>
    </DragNode>
  );
}
