
import { Layout } from 'antd';
import React from 'react';
import { ToolPanel } from '@/components/ToolPanel';
import { ConfigurationPanel } from '@/components/ConfigurationPanel';
import { Editor } from './Editor';

export const ExamplePage = () => {

  return (
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

  );
};
