import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { PREVIEW_COMPONENT_DATA_TYPE } from '@/constants';
import { useField, useFormikContext } from 'formik';
import { INodeItem } from '@/components/templete/templete.type';
import { get } from 'lodash';
import { BlockType } from '@/components/templete/constants';
import { useTemplate } from '@/components/templete/hooks/useTemplate';

type PreviewComponentProps = {
  icon: JSX.Element;
  type: BlockType;
  text: string;
};

export function PreviewComponent(props: PreviewComponentProps) {
  const { addBlock, } = useTemplate();
  const [draging, setDraging] = useState(false);
  const [{ value: focusIdx }, , { setValue: setFocusIdx }] = useField<string>('focusIdx');

  const [field] = useField<INodeItem>(focusIdx);
  const { values } = useFormikContext<INodeItem[]>();

  const { type, icon, text } = props;

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDraging(true);
  };



  useEffect(
    () => {
      if (!draging) return;
      const ele = document.getElementById('app-editor-container');
      if (!ele) {
        return;
      }

      const onDrop = (ev: DragEvent) => {
        const target = ev.target as HTMLElement;
        const parentIdx = target.getAttribute('data-node-idx') || '';
        const parent = get(values, parentIdx);
        if (parent) {
          ev.preventDefault();
          addBlock(type, parentIdx);

        }
        setDraging(false);

      };

      const onDragOver = (ev: DragEvent) => {
        const target = ev.target as HTMLElement;
        const insertElement = get(values, target.getAttribute('data-node-idx') || '') as INodeItem || null;
        if (insertElement) {
          ev.preventDefault();
        }
      };

      ele.addEventListener('dragover', onDragOver);
      ele.addEventListener('drop', onDrop);
      return () => {
        ele.removeEventListener('dragover', onDragOver);
        ele.removeEventListener('drop', onDrop);
      };
    },
    [draging, addBlock, values, type]
  );

  return (
    <div
      className={styles.baseComponent}
      onDragStart={onDragStart}
      draggable
      {...{ [PREVIEW_COMPONENT_DATA_TYPE]: type }}
    >
      {icon}
      <h3 className={styles.title}>{text}</h3>
    </div>
  );
}
