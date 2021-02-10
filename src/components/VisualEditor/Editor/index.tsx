import React, { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEditorContext } from '../hooks/useEditorContext';
import { EditorItem } from './components/EditorItem';
import { ToolBar } from './components/ToolBar';
import styles from './index.module.scss';

export const Editor = () => {
  const { moveByIdx } = useEditorContext();

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

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
    },
    [moveByIdx]
  );

  return (
    <div id='VisualEditorEditMode' className={styles.app}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div
              style={{ width: '100%' }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <EditorItem idx={'content.[0]'} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ToolBar />
    </div>
  );
};
