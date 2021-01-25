import { INodeItem } from '@/components/templete/templete.type';
import React from 'react';

import { useField, FieldArray, FormikProps } from 'formik';
import { componentMap } from '@/components/templete/components';

export interface RenderEditorProps {
  index: string;
}

export function RenderEditorItem(props: RenderEditorProps) {
  const name = props.index;

  const [field] = useField<INodeItem>(name);

  const Component = Object.values(componentMap).find(child => {
    return child.type === field.value.type;
  });

  if (Component) {

    return <Component.Main index={props.index} />;
  }
  return null;
}