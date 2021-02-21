import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import { BlockType } from '@VisualEditor/constants';
import { CustomerServiceOutlined, PictureOutlined, LayoutOutlined, GroupOutlined, FontSizeOutlined, MergeCellsOutlined, FormOutlined } from '@ant-design/icons';
import { BlockIcon } from './components/BlockIcon';

const { Panel } = Collapse;

export const ToolPanel = function () {

  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3']}>
        <Panel header="基础组件" key="1">
          <div className={styles.list}>
            <BlockIcon
              text="编组"
              type={BlockType.SECTION}
              icon={<GroupOutlined />}
            />
            <BlockIcon
              text="容器"
              type={BlockType.BOX}
              icon={<LayoutOutlined />}
            />
            <BlockIcon
              text="文本"
              type={BlockType.TEXT}
              icon={<FontSizeOutlined />}
            />
            <BlockIcon
              text="图片"
              type={BlockType.IMAGE}
              icon={<PictureOutlined />}
            />
            <BlockIcon
              text="音频"
              type={BlockType.AUDIO}
              icon={<CustomerServiceOutlined />}
            />
            <BlockIcon
              text="弹窗"
              type={BlockType.DIALOG}
              icon={<MergeCellsOutlined />}
            />
          </div>
        </Panel>
        <Panel header="扩展组件" key="2">
          <div className={styles.list}>
            <BlockIcon
              text="表单"
              type={BlockType.FORM}
              icon={<FormOutlined />}
            />

          </div>
        </Panel>

      </Collapse>
    </div>
  );
};
