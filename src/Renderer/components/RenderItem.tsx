import { IBlockData } from '@/typings';
import React from 'react';

import { useField } from 'formik';
import { findBlockByType } from '@/utils/block';

export interface EditorProps {
  idx: string;
}

export function RenderItem(props: EditorProps) {
  const [field] = useField<IBlockData>(props.idx);

  const block = findBlockByType(field.value.type);

  if (block) {
    const BlockRenderer = block.Renderer as any;
    if (field.value.data.link) {
      return <a href={field.value.data.link}><BlockRenderer idx={props.idx} /></a>;
    }
    return <BlockRenderer idx={props.idx} />;
  }
  return null;
}
