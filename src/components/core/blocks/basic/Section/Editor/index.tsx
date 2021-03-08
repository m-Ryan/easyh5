import React from 'react';
import { INodeItem } from '@/typings';
import { ISection } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { BlockWrapper } from '@/components/core/wrapper/BlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [field] = useField<INodeItem<ISection>>(props.idx);
  return (
    <BlockWrapper idx={props.idx}>
      <div>
        {field.value.children.map((_, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </BlockWrapper>
  );
}
