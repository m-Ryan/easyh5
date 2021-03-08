import React from 'react';
import { INodeItem } from '@/typings';
import { IBox } from '..';
import { useField } from 'formik';
import { RenderItem } from '@/Renderer/components/RenderItem';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<INodeItem<IBox>>(props.idx);
  return (
    <div data-node-type={field.value.type} data-node-idx={props.idx} style={field.value.style}>
      {field.value.children.map((item, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <RenderItem key={childIndex} idx={childIndex} />;
      })}
    </div>
  );
}
