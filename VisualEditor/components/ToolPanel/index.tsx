import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import { BasicType, FormType } from '@VisualEditor/constants';
import { CustomerServiceOutlined, PictureOutlined, LayoutOutlined, FontSizeOutlined, MergeCellsOutlined, FormOutlined } from '@ant-design/icons';
import { BlockIcon } from './components/BlockIcon';

const { Panel } = Collapse;

export const ToolPanel = function () {

  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3']}>
        <Panel header="基础组件" key="1">
          <div className={styles.list}>
            <BlockIcon
              text="容器"
              type={BasicType.BOX}
              icon={<LayoutOutlined />}
            />
            <BlockIcon
              text="文本"
              type={BasicType.TEXT}
              icon={<FontSizeOutlined />}
            />
            <BlockIcon
              text="图片"
              type={BasicType.IMAGE}
              icon={<PictureOutlined />}
            />
            <BlockIcon
              text="音频"
              type={BasicType.AUDIO}
              icon={<CustomerServiceOutlined />}
            />
            <BlockIcon
              text="弹窗"
              type={BasicType.DIALOG}
              icon={<MergeCellsOutlined />}
            />
          </div>
        </Panel>
        <Panel header="扩展组件" key="2">
          <div className={styles.list}>
            <BlockIcon
              text="表单"
              type={FormType.FORM}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text="输入框"
              type={FormType.INPUT}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text="单选框"
              type={FormType.RADIO}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text="多选框"
              type={FormType.CHECKBOX}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text="开关"
              type={FormType.SWITCH}
              icon={<FormOutlined />}
            />
            <BlockIcon
              text="提交按钮"
              type={FormType.SUBMIT_BTN}
              icon={<FormOutlined />}
            />

          </div>
        </Panel>

      </Collapse>
    </div>
  );
};
