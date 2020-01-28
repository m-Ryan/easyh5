import React from 'react';
import { ICountdown } from '../../countdown';
import { DragNode } from '../../../../drag-node';
import { INodeItem } from '@/components/templete/templete.type';

export interface ICountdownProps {
  element: ICountdown;
  renderItem: React.FunctionComponent<{ list: INodeItem[] }>;
}

export function Main(props: ICountdownProps) {
  const { element, renderItem } = props;
  return (
    <DragNode {...props}>
      <div>
        {element.children.length > 0 ? <props.renderItem list={element.children} /> : null}
      </div>
    </DragNode>
  );
}
