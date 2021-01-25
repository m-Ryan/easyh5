import React from 'react';
import styles from './index.module.scss';
import { Collapse } from 'antd';
import { PreviewComponent } from './components/preview-component';
import { NodeType, CustomComponentType } from '@/components/templete/constants';
import { SnippetsOutlined, PictureOutlined, LayoutOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

interface Props {

}

export const ComponentMenu = function (props: Props) {

  return (
    <div className={styles.container}>
      <Collapse className={styles.collapse} defaultActiveKey={['1', '2', '3']}>
        <Panel header="基础组件" key="1">
          <div className={styles.list}>
            <PreviewComponent
              text="编组组件"
              type={NodeType.SECTION}
              icon={<SnippetsOutlined />}
            />
            <PreviewComponent
              text="文本组件"
              type={NodeType.TEXT}
              icon={<SnippetsOutlined />}
            />
            <PreviewComponent
              text="图片组件"
              type={NodeType.BITMAP}
              icon={<PictureOutlined />}
            />
            <PreviewComponent
              text="图形组件"
              type={NodeType.BLOCK}
              icon={<LayoutOutlined />}
            />
          </div>
        </Panel>
        <Panel header="运营组件" key="2">
          <div className={styles.list}>
            {/* <PreviewComponent
              text="滚动数字"
              type={CustomComponentType.SliderNumber}
              icon="rocket"
            /> */}
            <PreviewComponent
              text="轮播器"
              type={CustomComponentType.Swiper}
              icon="block"
            />
            {/* <PreviewComponent
              text="转盘"
              type={CustomComponentType.Turntable}
              icon="chrome"
            /> */}
            <PreviewComponent
              text="刮刮卡"
              type={CustomComponentType.Scratchcard}
              icon="credit-card"
            />
          </div>
        </Panel>
        <Panel header="DIY组件" key="3">
          <div className={styles.list}>
            <PreviewComponent
              text="倒计时"
              type={CustomComponentType.Countdown}
              icon="clock-circle"
            />
            <PreviewComponent
              text="弹窗"
              type={CustomComponentType.Dialog}
              icon="project"
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};
