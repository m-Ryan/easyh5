import React, {
  useEffect,
  useState,
} from 'react';
import styles from './index.module.scss';
import { PREVIEW_COMPONENT_DATA_TYPE } from '@/constants';
import { useFormikContext } from 'formik';
import { INodeItem } from '@VisualEditor/typings';
import { get } from 'lodash';
import { BlockType } from '@VisualEditor/constants';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

type BlockIconProps = {
  icon: JSX.Element;
  type: BlockType;
  text: string;
};

const findInsertNode = (target: HTMLElement): HTMLElement | null => {
  if (target.getAttribute('data-node-idx')) {
    return target;
  }
  if (target.parentNode) {
    return findInsertNode(target.parentNode as HTMLElement);
  }
  return null;
};

export function BlockIcon(props: BlockIconProps) {
  const { addBlock } = useEditorContext();
  const [draging, setDraging] = useState(false);

  const { values } = useFormikContext<INodeItem[]>();

  const { type, icon, text } = props;
  const ele = document.getElementById('VisualEditorEditMode');
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setDraging(true);
  };

  useEffect(() => {
    if (!ele) return;

    const onDragOver = (ev: DragEvent) => {
      const target = ev.target as HTMLElement;
      if (findInsertNode(target)) {
        ev.preventDefault();
      }
    };

    const onMouseUp = () => {
      setDraging(false);
    };

    ele.addEventListener('dragover', onDragOver);
    window.addEventListener('dragend', onMouseUp);
    return () => {
      ele.removeEventListener('dragover', onDragOver);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [ele]);

  useEffect(() => {

    if (!ele) return;

    const onDrop = (ev: DragEvent) => {
      if (!draging) return;
      const target = ev.target as HTMLElement;
      const parentIdx = findInsertNode(target)?.getAttribute('data-node-idx') || '';
      const parent = get(values, parentIdx);
      if (parent) {
        ev.preventDefault();
        addBlock(type, parentIdx);
      }
    };

    ele.addEventListener('drop', onDrop);
    return () => {

      ele.removeEventListener('drop', onDrop);
    };
  }, [addBlock, draging, ele, type, values]);

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
