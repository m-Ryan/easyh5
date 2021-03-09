import { useBlock } from '@/hooks/useBlock';
import React, { useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const EditorFrame: React.FC<{}> = (props) => {

  const { moveByIdx } = useBlock();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      // 编辑器内移动
      if (result.source.droppableId === 'Editor') {
        const getNodeIdx = (index: number) => {
          const ele = document.querySelector(`[data-rbd-draggable-id="${index}"]`)
            ?.firstChild as HTMLDivElement;
          return ele.getAttribute('data-node-idx');
        };

        const destinationIdx = getNodeIdx(result.destination.index);
        const sourceIdx = getNodeIdx(result.source.index);

        if (destinationIdx && sourceIdx) {
          moveByIdx(sourceIdx, destinationIdx);
        }
      }

    },
    [moveByIdx]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {props.children}
    </DragDropContext>
  );

};