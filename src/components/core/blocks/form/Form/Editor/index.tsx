import React from 'react';
import { IForm } from '..';
import { useField } from 'formik';
import { EditorItem } from '@/Editor/components/EditorItem';
import { Stack } from '@/components/Stack';
import { FormProvier } from '@/context/FormContext';
import { BlockWrapper } from '@/components/core/wrapper/BlockWrapper';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<IForm>(props.idx);

  return (

    <FormProvier>
      <BlockWrapper idx={props.idx}>
        <div>
          <Stack vertical>
            {value.children.map((item, index) => {
              const childIndex = `${props.idx}.children.[${index}]`;
              return <EditorItem key={childIndex} idx={childIndex} />;
            })}
            <Stack.Item />
          </Stack>
        </div>
      </BlockWrapper>
    </FormProvier>

  );
}

