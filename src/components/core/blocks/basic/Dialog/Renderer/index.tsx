import React from 'react';
import { IDialog } from '..';
import { useField } from 'formik';
import { RenderItem } from '@/Renderer/components/RenderItem';
import { useDialog } from '@/hooks/useDialog';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IDialog>(props.idx);
  const { dialogUid } = useDialog();
  if (dialogUid !== value.data.value.uid) return null;
  return (
    <div data-node-type={value.type} data-node-idx={props.idx} style={{ ...value.style, position: 'fixed' }}>
      {value.children.map((item, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <RenderItem key={childIndex} idx={childIndex} />;
      })}
    </div>
  );
}
