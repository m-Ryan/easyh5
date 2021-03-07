
import { Layout } from 'antd';
import React from 'react';
import { ToolPanel } from '@VisualEditor/components/ToolPanel';
import { ConfigurationPanel } from '@VisualEditor/components/ConfigurationPanel';
import { Editor } from './Editor';
import { VisualEditorProvider } from './components/VisualEditorProvider';

export const ExamplePage = () => {

  return (
    <VisualEditorProvider>
      <Layout style={{
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
      }}
      >
        <Layout.Sider theme="light" width={302} collapsible collapsed={false}>
          <ToolPanel />
        </Layout.Sider>

        <Layout>
          <Editor />
        </Layout>

        <Layout.Sider theme="light" width={350} collapsible collapsed={false}>
          <div style={{
            height: '100%',
            overflowY: 'scroll',
          }}
          >
            <ConfigurationPanel />
          </div>
        </Layout.Sider>
      </Layout>
    </VisualEditorProvider>

  );
};
