import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { RenderItem } from '@VisualEditor/Renderer/components/RenderItem';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [field] = useField<INodeItem<IPage>>(props.idx);
  return (
    <main>
      {field.value.children.map((item, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <RenderItem key={childIndex} idx={childIndex} />;
      })}
    </main>
  );
}
