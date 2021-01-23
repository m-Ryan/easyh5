import React, { useCallback } from 'react';
import { RenderPreviewItem } from '../../../../render-preview-item';
import { useSelector } from '@/modal';
import { IDialog } from '..';

export interface IDialogProps {
  element: IDialog;
}

export function Preview(props: IDialogProps) {
  const element = props.element;
  const { dialogId, setDialogShow } = useSelector('article');
  const onClose = useCallback(() => {
    setDialogShow(0);
  }, [setDialogShow])

  if (dialogId !== element.data.value.uid) return null;
  return (
    <div style={{ ...element.style,  position: 'fixed' }}>
      <div style={{ width: '100%', height: '100%', position: 'absolute',  top: 0, left: 0, opacity: 0 }} onClick={onClose}></div>
      {element.children.length > 0 ? <RenderPreviewItem list={element.children} /> : null}
    </div>
  );
}
