import { BridgeEvent } from '@VisualEditor/constants';
import { useDeviceToolbar } from '@VisualEditor/hooks/useDeviceToolbar';
import { Renderer } from '@VisualEditor/Renderer';
import { Bridge } from '@VisualEditor/utils/Bridge';
import { Tabs } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEditorContext } from '../hooks/useEditorContext';
import { DialogBar } from './components/DialogBar';
import { EditorItem } from './components/EditorItem';
import { ToolBar } from './components/ToolBar';
import styles from './index.module.scss';
const TabPane = Tabs.TabPane;

export const Editor = () => {
  const { moveByIdx, pageValue: { data: { value: { h5 } } }, values } = useEditorContext();
  const { width, height, scale, content } = useDeviceToolbar();
  const [previewInited, setPreviewInited] = useState(false);
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const callback = () => setPreviewInited(true);
    Bridge.on(BridgeEvent.PREVIEW_INITED, callback);

    return () => {
      Bridge.off(BridgeEvent.PREVIEW_INITED, callback);
    };
  }, []);

  useEffect(() => {
    const iframe = ref.current;
    if (!previewInited || !iframe) return;
    Bridge.emitToPreview(iframe, BridgeEvent.EDITOR_VALUE_CHANGE, values);
  }, [values, previewInited]);

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

  const innerContainerStyles: React.CSSProperties = { width, height: height, transform: `scale(${scale})`, margin: '0 auto', transformOrigin: 'top left', transition: 'all .3s', maxWidth: h5.enabled ? h5.pageMaxWidth : undefined };
  return (
    <div style={{ width: '100%' }}>
      {content}
      <Tabs tabBarStyle={{ paddingLeft: 20 }}>
        <TabPane tab="编辑" key="editor">
          <div style={{ position: 'relative' }}>
            <div className={styles.container}>
              <div id='VisualEditorEditMode' style={innerContainerStyles}>
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
              <iframe ref={ref} src="/preview" height="100%" width="100%" style={{ border: 'none' }} />
            </div>
          </div>

        </TabPane>
      </Tabs>

    </div>
  );
};
