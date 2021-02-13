import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { useBlockFocus } from '@VisualEditor/hooks/useBlockFocus';
import { RenderItem } from '@VisualEditor/Renderer/components/RenderItem';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<INodeItem<IPage>>(props.idx);
  const { type, children, style } = field.value;

  return (
    <main style={style} data-node-type={type} data-node-idx={props.idx}>
      {children.map((item, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <RenderItem key={childIndex} idx={childIndex} />;
      })}
    </main>
  );
}
