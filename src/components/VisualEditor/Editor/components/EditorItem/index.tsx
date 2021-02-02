import { INodeItem } from '@VisualEditor/typings';
import React from 'react';

import { useField } from 'formik';
import { findBlockByType } from '@VisualEditor/utils/findBlockByType';

export interface EditorProps {
  idx: string;
}

export function EditorItem(props: EditorProps) {

  const [field] = useField<INodeItem>(props.idx);

  const block = findBlockByType(field.value.type);

  if (block) {
    return <block.Edit idx={props.idx} />;
  }
  return null;
}