import React from 'react';
import { DragNode } from '../../../../drag-node';
import { INodeItem } from '@/components/templete/templete.type';
import { useSelector } from '@/modal';
import { IDialog } from '..';

export interface IDialogProps {
	element: IDialog;
  renderItem: React.FunctionComponent<{ list: INodeItem[] }>;
}

export function Main(props: IDialogProps) {
  const { dialogId } = useSelector('article');
  const { element } = props;
  if (dialogId !== element.data.value.uid) return null;
  return (
    <DragNode {...props}>
      <div>
        {element.children.length > 0 ?<props.renderItem list={element.children} /> : null}
      </div>
    </DragNode>
  );
}
