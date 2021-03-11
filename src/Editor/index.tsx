
import { useDeviceToolbar } from '@/hooks/useDeviceToolbar';
import { Tabs } from 'antd';
import React, { useCallback } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { DialogBar } from './components/DialogBar';
import { EditorItem } from './components/EditorItem';
import styles from './index.module.scss';
import { IframeComponent } from './components/IframeComponent';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { getPageIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { Renderer } from '@/Renderer';
import { RenderItem } from '@/Renderer/components/RenderItem';

const TabPane = Tabs.TabPane;

export const Editor = () => {

  const { pageData: { data: { value: { h5 } } }, values: { pageIndex } } = useEditorContext();

  const { width, height, content } = useDeviceToolbar();

  const innerContainerStyles: React.CSSProperties = { width, height, margin: '0 auto', transition: 'all .3s', };

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
      <div style={{ width: '100%' }}>
        {content}
        <Tabs tabBarStyle={{ paddingLeft: 20 }}>
          <TabPane tab="编辑" key="editor">
            <div style={{ position: 'relative' }}>
              <Droppable droppableId='Editor'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                  // {...provided.droppableProps}
                  >
                    <div className={styles.container}>
                      <div id='VisualEditorEditMode' data-h5={h5.enabled} style={innerContainerStyles}>
                        <EditorItem idx={getPageIdx(pageIndex)} />
                      </div>
                    </div>
                    <div style={{ opacity: 0 }}>{provided.placeholder}</div>
                  </div>
                )}

              </Droppable>

              <DialogBar />

            </div>
          </TabPane>
          <TabPane tab="预览" key="preview">
            <div className={styles.container}>
              <div style={innerContainerStyles}>
                <IframeComponent height="100%" width="100%" style={{ border: 'none' }}>
                  <RenderItem idx={getPageIdx(pageIndex)} />
                </IframeComponent>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </DragDropContext>

  );
};

