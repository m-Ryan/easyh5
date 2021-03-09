import { useBlock } from '@/hooks/useBlock';
import { getIndexByIdx } from '@/utils/block';
import React from 'react';
import { Draggable as ReactDraggable } from 'react-beautiful-dnd';
import { INodeItem } from '../../../../typings';
export interface DraggableProps {
  children: React.ReactElement;
  idx: string;
  data: INodeItem;
}
export default function Draggable(props: DraggableProps) {
  const { idx, children, data } = props;
  const id = getIndexByIdx(props.idx);
  const { focusIdx } = useBlock();

  return (
    <ReactDraggable
      key={idx}
      isDragDisabled={focusIdx !== idx}
      draggableId={id.toString()}
      index={id}
    >
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          {React.createElement(children.type, {
            ...children.props,
            ['data-node-type']: data.type,
            ['data-node-idx']: idx,
            style: {
              ...(children.props.style || {}),
              ...data.style,
            },
          })}
        </div>
      )}
    </ReactDraggable>
  );
}
