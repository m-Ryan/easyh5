import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IBox } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';
import Moveable from '@VisualEditor/components/Moveable';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<INodeItem<IBox>>(props.idx);
  return (
    <Moveable idx={props.idx}>
      <div>
        {field.value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </Moveable>
  );
}
