
import { useDeviceToolbar } from '@/hooks/useDeviceToolbar';
import { Tabs, Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { DialogBar } from './components/DialogBar';
import { EditorItem } from './components/EditorItem';
import styles from './index.module.scss';
import { IframeComponent } from './components/IframeComponent';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { getPageIdx } from '@/utils/block';
import { useBlock } from '@/hooks/useBlock';
import { RenderItem } from '@/Renderer/components/RenderItem';
import { ToolBar } from './components/ToolBar';

const TabPane = Tabs.TabPane;

export const Editor = () => {

  const { values: { pageIndex }, } = useEditorContext();
  const [activeTab, setActiveTab] = useState('editor');

  const { width, height, content } = useDeviceToolbar();

  const innerContainerStyles: React.CSSProperties = { width, height, margin: '0 auto', };

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
        <Tabs activeKey={activeTab} tabBarStyle={{ paddingLeft: 20 }} onChange={setActiveTab}>
          <TabPane tab="编辑" key="editor">
            <div style={{ position: 'relative' }}>
              <Droppable droppableId='Editor'>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className={styles.container}>
                      <div id='VisualEditorEditMode' style={innerContainerStyles}>
                        <Tooltip
                          visible
                          placement="topLeft"
                          title={<ToolBar />}
                        >
                          <EditorItem idx={getPageIdx(pageIndex)} />
                        </Tooltip>
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

                <IframeComponent height="100%" width="100%" style={{ border: 'none', paddingTop: -16 }}>
                  <RenderItem idx={getPageIdx(pageIndex)} />
                </IframeComponent>

                {/* <RenderItem idx={getPageIdx(pageIndex)} /> */}
              </div>

            </div>

          </TabPane>
        </Tabs>
      </div>
    </DragDropContext>

  );
};

