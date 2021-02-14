import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { useField } from 'formik';
import { RenderItem } from '@VisualEditor/Renderer/components/RenderItem';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<INodeItem<{}>>(props.idx);
  return (
    <p data-node-type={value.type} data-node-idx={props.idx} style={value.style}>
      {value.children.map((_, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <RenderItem key={childIndex} idx={childIndex} />;
      })}
    </p>
  );
}
