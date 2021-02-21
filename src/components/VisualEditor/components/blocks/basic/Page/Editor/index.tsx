import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<INodeItem<IPage>>(props.idx);
  const { type, children, style } = field.value;

  return (
    <main style={style} data-node-type={type} data-node-idx={props.idx}>
      {children.map((item, index) => {
        const childIndex = `${props.idx}.children.[${index}]`;
        return <EditorItem key={childIndex} idx={childIndex} />;
      })}
    </main>
  );
}
