import React from 'react';
import { INodeItem } from '@VisualEditor/typings';
import { IDialog } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';
import Moveable from '@VisualEditor/components/core/wrapper/Moveable';
import { useDialog } from '@VisualEditor/hooks/useDialog';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IDialog>(props.idx);
  const { dialogUid } = useDialog();
  if (dialogUid !== value.data.value.uid) return null;

  return (
    <Moveable idx={props.idx}>
      <div>
        {value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </Moveable>
  );
}
