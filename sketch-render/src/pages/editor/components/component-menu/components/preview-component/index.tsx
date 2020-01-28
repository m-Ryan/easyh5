import React, { useLayoutEffect } from 'react';
import styles from './index.module.scss';
import { PREVIEW_COMPONENT_DATA_TYPE } from '@/constants';
import { Icon } from 'antd';

type PreviewComponentProps = {
	icon: string;
	type: string;
	text: string;
};

export function PreviewComponent(props: PreviewComponentProps) {
  const { type, icon, text } = props;

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('Text', type);
  };
  return (
    <div
      className={styles.baseComponent}
      onDragStart={dragStart}
      draggable
      {...{ [PREVIEW_COMPONENT_DATA_TYPE]: type }}
    >
      <Icon style={{ fontSize: 24 }} type={icon} />
      <h3 className={styles.title}>{text}</h3>
    </div>
  );
}
