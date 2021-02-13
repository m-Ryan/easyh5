import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IDialog } from '..';
import { useField } from 'formik';
import { RenderItem } from '@VisualEditor/Renderer/components/RenderItem';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<INodeItem<IDialog>>(props.idx);
  return (
    <div style={{ ...field.value.style, position: 'fixed' }}>
      {field.value.children.map((item, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <RenderItem key={childIndex} idx={childIndex} />;
      })}
    </div>
  );
}
