import React, { useMemo, useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Stack } from '../Stack';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

interface FrameProps {
  breadcrumb: {
    link?: string;
    title: string
  }
  children: React.ReactNode
}

export default function Frame({ children, breadcrumb }: FrameProps) {
  return (
    <Layout>
      <Header className="header">
        <Stack alignment="center">
          <h1 style={{ color: 'white' }}>营销H5</h1>
        </Stack>

      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: 'calc(100vh - 64px)', borderRight: 0 }}
          >
            <SubMenu key="sub1" title="数据模板">
              <Menu.Item key="1">数据模板</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: 24 }}>
          <Stack vertical>
            <Breadcrumb>
              <Breadcrumb.Item>
                {breadcrumb.link ? <Link to={breadcrumb.link}><h3><strong>{breadcrumb.title}</strong></h3></Link> : breadcrumb.title}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                backgroundColor: '#fff'
              }}
            >
              {children}
            </Content>
          </Stack>
        </Layout>
      </Layout>
    </Layout>
  )
}