import React from 'react';
import { INodeItem } from '@/typings';
import { IBox } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import Moveable from '@/components/core/wrapper/Moveable';

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
