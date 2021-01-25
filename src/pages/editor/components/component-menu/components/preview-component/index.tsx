import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import { PREVIEW_COMPONENT_DATA_TYPE } from '@/constants';
import { useField, useFormikContext } from 'formik';
import { INodeItem } from '@/components/templete/templete.type';
import { get, values } from 'lodash';
import { NodeType } from '@/components/templete/constants';

type PreviewComponentProps = {
  icon: JSX.Element;
  type: NodeType;
  text: string;
};

export function PreviewComponent(props: PreviewComponentProps) {
  const [draging, setDraging] = useState(false);
  const [{ value: focusIdx }, , { setValue: setFocusIdx }] = useField<string>('focusIdx');

  const [field] = useField<INodeItem>(focusIdx);
  const [{ value }, , helpers] = useField<INodeItem[]>('content');

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

      const onDrop = (event: DragEvent) => {
        event.preventDefault();
        const target = event.target as HTMLElement;
        const insertElement = getNearestInsertelement({
          type,
          idx: target.getAttribute('data-node-idx'),
          list: value
        });
        setDraging(false);

      };

      const onDragOver = (ev: DragEvent) => {
        ev.preventDefault();
      };

      ele.addEventListener('dragover', onDragOver);
      ele.addEventListener('drop', onDrop);
      return () => {
        ele.removeEventListener('dragover', onDragOver);
        ele.removeEventListener('drop', onDrop);
      };
    },
    [draging]
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


function getNearestInsertelement(params: {
  type: NodeType;
  list: INodeItem[];
  idx?: string;
}) {
  const { type, list, idx } = params;
  if (!idx) {
    return list[0];
  }

  switch (type) {

  }
}