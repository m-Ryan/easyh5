import React from 'react';
import { ICheckbox } from '..';
import { useField } from 'formik';
import { CheckboxField } from '@/components/Form';
import { BlockWrapper } from '@VisualEditor/components/BlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<ICheckbox>(props.idx);
  const { ...fieldProps } = value.data.value;

  return (
    <BlockWrapper idx={props.idx}>
      <div>
        <CheckboxField
          alignment="leading"
          style={{ display: 'flex', flexDirection: 'column' }}
          {...fieldProps}
          name={`${props.idx}.data.value.defaultValue`}
          inline
        />
      </div>
    </BlockWrapper>

  );
}
