
import { useDeviceToolbar } from '@VisualEditor/hooks/useDeviceToolbar';
import { Tabs } from 'antd';
import React from 'react';
import { useEditorContext } from '../hooks/useEditorContext';
import { DialogBar } from './components/DialogBar';
import { EditorItem } from './components/EditorItem';
import styles from './index.module.scss';
import { IframeComponent } from './components/IframeComponent';
import { Renderer } from '@VisualEditor';
import { Droppable } from 'react-beautiful-dnd';

const TabPane = Tabs.TabPane;

export const Editor = () => {

  const { pageValue: { data: { value: { h5 } } } } = useEditorContext();

  const { width, height, content } = useDeviceToolbar();

  const innerContainerStyles: React.CSSProperties = { width, height, margin: '0 auto', transition: 'all .3s', };

  return (
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
                      <EditorItem idx={'content.[0]'} />
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
                <Renderer />
              </IframeComponent>
              {/* <Renderer /> */}
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>

  );
};
