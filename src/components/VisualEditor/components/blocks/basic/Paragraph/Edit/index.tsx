import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { useField } from 'formik';
import Moveable from '@VisualEditor/components/Moveable';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';

type IProps = {
  idx: string;
};

export function Edit(props: IProps) {
  const [{ value }] = useField<INodeItem<{}>>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <p>
        {
          value.children.map((_, index) => {
            const childIndex = `${props.idx}.children.[${index}]`;
            return <EditorItem key={childIndex} idx={childIndex} />;
          })
        }
      </p>
    </Moveable>

  );
}
