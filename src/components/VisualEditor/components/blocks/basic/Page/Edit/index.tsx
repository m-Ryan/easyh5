import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';

type IProps = {
  idx: string;
};

export function Edit(props: IProps) {
  const [field] = useField<INodeItem<IPage>>(props.idx);
  return (

    <main>
      {
        field.value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })
      }
    </main>

  );
}
