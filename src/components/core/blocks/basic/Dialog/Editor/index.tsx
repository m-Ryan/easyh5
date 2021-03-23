import React from 'react';
import { IDialog } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { useDialog } from '@/hooks/useDialog';
import { EditBlockWrapper } from '@/components/core/wrapper/EditBlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IDialog>(props.idx);
  const { dialogUid } = useDialog();
  if (dialogUid !== value.data.value.uid) return null;

  return (
    <EditBlockWrapper idx={props.idx} data-dialog-uid={value.data.value.uid}>
      <div>
        {value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <EditorItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </EditBlockWrapper>
  );
}
