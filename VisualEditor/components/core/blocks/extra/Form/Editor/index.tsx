import React from 'react';
import { IForm } from '..';
import { useField } from 'formik';
import { EditorItem } from '@VisualEditor/Editor/components/EditorItem';
import { Stack } from '@VisualEditor/components/Stack';
import { FormProvier } from '@VisualEditor/context/FormContext';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IForm>(props.idx);

  return (

    <FormProvier>
      <div style={value.style} data-node-type={value.type} data-node-idx={props.idx}>
        <Stack vertical>
          {value.children.map((item, index) => {
            const childIndex = `${props.idx}.children.[${index}]`;
            return <EditorItem key={childIndex} idx={childIndex} />;
          })}
          <Stack.Item />
        </Stack>
      </div>
    </FormProvier>

  );
}

