import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IPage } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';
import { BlockWrapper } from '@VisualEditor/components/core/wrapper/BlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<INodeItem<IPage>>(props.idx);
  const { children } = field.value;

  return (
    <BlockWrapper idx={props.idx}>
      <main>
        {children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </main>
    </BlockWrapper>
  );
}
