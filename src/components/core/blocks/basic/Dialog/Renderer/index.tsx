import React from 'react';
import { IDialog } from '..';
import { useField } from 'formik';
import { RenderItem } from '@/Renderer/components/RenderItem';
import { useDialog } from '@/hooks/useDialog';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IDialog>(props.idx);
  const { dialogUid } = useDialog();
  if (dialogUid !== value.data.value.uid) return null;
  return (
    <RenderBlockWrapper idx={props.idx}>
      <div style={{ ...value.style, position: 'fixed' }}>
        {value.children.map((item, index) => {
          const childIndex = `${props.idx}.children.[${index}]`;
          return <RenderItem key={childIndex} idx={childIndex} />;
        })}
      </div>
    </RenderBlockWrapper>

  );
}
