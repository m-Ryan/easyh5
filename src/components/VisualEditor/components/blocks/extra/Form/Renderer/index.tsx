import React from 'react';
import { IForm } from '..';
import { useField } from 'formik';
import { RenderItem } from '@VisualEditor/Renderer/components/RenderItem';
import { FormProvier } from '@VisualEditor/context/FormContext';
import { Stack } from '@/components/Stack';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<IForm>(props.idx);

  return (

    <FormProvier>
      <div style={value.style} data-node-type={value.type} data-node-idx={props.idx}>
        <Stack vertical>
          {value.children.map((item, index) => {
            const childIndex = `${props.idx}.children.[${index}]`;
            return <RenderItem key={childIndex} idx={childIndex} />;
          })}
          <Stack.Item />
        </Stack>
      </div>
    </FormProvier>

  );
}
