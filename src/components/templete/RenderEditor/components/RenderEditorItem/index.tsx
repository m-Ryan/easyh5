import { INodeItem } from '@/components/templete/templete.type';
import React from 'react';

import { useField, FieldArray, FormikProps } from 'formik';
import { BlocksMap } from '@/components/templete/components/blocks';
import { findBlockByType } from '@/components/templete/utils/findBlockByType';

export interface RenderEditorProps {
  idx: string;
}

export function RenderEditorItem(props: RenderEditorProps) {

  const [field] = useField<INodeItem>(props.idx);

  const block = findBlockByType(field.value.type);

  if (block) {
    return <block.Main idx={props.idx} />;
  }
  return null;
}