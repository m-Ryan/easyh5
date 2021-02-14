import { useDeviceToolbar } from '@VisualEditor/hooks/useDeviceToolbar';
import { Renderer } from '@VisualEditor/Renderer';
import React, { useCallback, useEffect } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEditorContext } from '../hooks/useEditorContext';
import { DialogBar } from './components/DialogBar';
import { EditorItem } from './components/EditorItem';
import { ToolBar } from './components/ToolBar';

export const Editor = () => {
  const { moveByIdx } = useEditorContext();
  const { preview, width, height, scale, content } = useDeviceToolbar();

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

  const styles = { width, height, transform: `scale(${scale / 100})`, margin: '0 auto' };
  return (
    <div>
      {content}
      {
        preview
          ? <div style={styles}><Renderer /></div>
          : (
            <div style={{ position: 'relative' }}>
              <div id='VisualEditorEditMode' style={styles}>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId='droppable'>
                    {(provided) => (
                      <div
                        style={{ width: '100%', height: '100%' }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <EditorItem idx={'content.[0]'} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
              <DialogBar />
              <ToolBar />
            </div>

          )
      }

    </div>
  );
};
