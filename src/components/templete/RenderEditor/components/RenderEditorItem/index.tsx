import { INodeItem } from '@/components/templete/templete.type';
import React from 'react';

import { useField, FieldArray, FormikProps } from 'formik';
import { BlocksMap } from '@/components/templete/components/blocks';

export interface RenderEditorProps {
  index: string;
}

export function RenderEditorItem(props: RenderEditorProps) {
  const name = props.index;

  const [field] = useField<INodeItem>(name);

  const Component = Object.values(BlocksMap).find(child => {
    return child.config.type === field.value.type;
  });

  if (Component) {

    return <Component.Main index={props.index} />;
  }
  return null;
}