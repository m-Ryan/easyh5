import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { ISection } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';
import Draggable from '@VisualEditor/components/Draggable';

type IProps = {
  idx: string;
};

export function Edit(props: IProps) {
  const [field] = useField<INodeItem<ISection>>(props.idx);
  return (
    <Draggable data={field.value} idx={props.idx}>
      <div>
        {
          field.value.children.map((_, index) => {
            const childIndex = `${props.idx}.children.[${index}]`;
            return <EditorItem key={childIndex} idx={childIndex} />;
          })
        }
      </div>
    </Draggable>
  );
}
