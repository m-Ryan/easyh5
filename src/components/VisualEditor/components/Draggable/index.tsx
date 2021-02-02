
import React, { useEffect, useRef } from 'react';
import { Draggable as ReactDraggable } from 'react-beautiful-dnd';
import { useTemplate } from '../../hooks/useTemplate';
import { INodeItem } from '../../typings';
export interface DraggableProps {
  children: React.ReactElement;
  idx: string;
  data: INodeItem;
}
export default function Draggable(props: DraggableProps) {

  const { idx, children, data } = props;
  const id = Number(props.idx.match(/\.\[(\d+)\]$/)?.[1]);
  const { focusIdx, setFocusIdx } = useTemplate();


  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    const ele = document.querySelector(`[data-node-idx="${idx}"]`) as HTMLDivElement;
    if (ele) {
      setFocusIdx(idx);
    }
  };

  useEffect(() => {
    const ele = document.querySelector(`[data-node-idx="${idx}"]`) as HTMLDivElement;
    if (!ele) return;
    if (idx !== focusIdx) {
      ele.classList.remove('block-selected');
    } else {
      ele.classList.add('block-selected');
    }
  }, [focusIdx, idx]);

  const onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    target.classList.add('block-hover');
  };

  const onMouseOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as HTMLElement;
    target.classList.remove('block-hover');
  };

  return <ReactDraggable key={idx} isDragDisabled={focusIdx !== idx} draggableId={id.toString()} index={id}>
    {(draggableProvided) => (


      <div
        ref={draggableProvided.innerRef}
        {...draggableProvided.draggableProps}
        {...draggableProvided.dragHandleProps}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        {
          React.createElement(children.type, {
            ...children.props,
            ['data-node-type']: data.type,
            ['data-node-idx']: idx,
            style: {
              ...(children.props.style || {}),
              ...data.style,
            },
          })
        }
      </div>
    )}

  </ReactDraggable>;
};
