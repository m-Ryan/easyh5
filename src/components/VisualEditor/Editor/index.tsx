
import { useDeviceToolbar } from '@VisualEditor/hooks/useDeviceToolbar';
import { useBlockFocus } from '@VisualEditor/hooks/useBlockFocus';
import { Tabs } from 'antd';
import React, { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEditorContext } from '../hooks/useEditorContext';
import { DialogBar } from './components/DialogBar';
import { EditorItem } from './components/EditorItem';
import { ToolBar } from './components/ToolBar';
import styles from './index.module.scss';
import { IframeComponent } from './components/IframeComponent';
import { Renderer } from '@VisualEditor';

const TabPane = Tabs.TabPane;

export const Editor = () => {

  useBlockFocus();

  const { moveByIdx, pageValue: { data: { value: { h5 } } } } = useEditorContext();

  const { width, height, content } = useDeviceToolbar();

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

  const innerContainerStyles: React.CSSProperties = { width, height, margin: '0 auto', transition: 'all .3s', };

  return (
    <div style={{ width: '100%' }}>
      {content}
      <Tabs tabBarStyle={{ paddingLeft: 20 }}>
        <TabPane tab="编辑" key="editor">
          <div style={{ position: 'relative' }}>
            <div className={styles.container}>
              <div id='VisualEditorEditMode' data-h5={h5.enabled} style={innerContainerStyles}>
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
            </div>
            <DialogBar />
            <ToolBar />
          </div>
        </TabPane>
        <TabPane tab="预览" key="preview" forceRender>
          <div className={styles.container}>
            <div style={innerContainerStyles}>
              <IframeComponent height="100%" width="100%" style={{ border: 'none' }}>
                <Renderer />
              </IframeComponent>

            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
