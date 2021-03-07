import { INodeItem } from '@VisualEditor/typings';
import React from 'react';

import { useField } from 'formik';
import { findBlockByType } from '@VisualEditor/utils/block';

export interface EditorProps {
  idx: string;
}

export function RenderItem(props: EditorProps) {
  const [field] = useField<INodeItem>(props.idx);

  const block = findBlockByType(field.value.type);

  if (block) {
    if (field.value.data.link) {
      return <a href={field.value.data.link}><block.Renderer idx={props.idx} /></a>;
    }
    return <block.Renderer idx={props.idx} />;
  }
  return null;
}
