import React, { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useTemplate } from '../hooks/useTemplate';
import { EditorItem } from './components/EditorItem';


export const Editor = () => {
  const { swapByIdx } = useTemplate();

  const onDragEnd = useCallback((result: DropResult) => {

    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const getNodeIdx = (index: number) => {
      const ele = document.querySelector(`[data-rbd-draggable-id="${index}"]`)?.firstChild as HTMLDivElement;
      return ele.getAttribute('data-node-idx');
    };

    const destinationIdx = getNodeIdx(result.destination.index);;
    const sourceIdx = getNodeIdx(result.source.index);

    if (destinationIdx && sourceIdx) {
      swapByIdx(sourceIdx, destinationIdx);
    }
  }, [swapByIdx]);

  return (
    <DragDropContext onDragEnd={onDragEnd} >
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <EditorItem idx={'content.[0]'} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>

  );
};


