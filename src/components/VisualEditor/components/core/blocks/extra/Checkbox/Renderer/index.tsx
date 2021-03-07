import React from 'react';
import { ICheckbox } from '..';
import { useField } from 'formik';
import { CheckboxField } from '@VisualEditor/components/core/Form';
import { BlockWrapper } from '@VisualEditor/components/core/wrapper/BlockWrapper';
import { useFormContext } from '@VisualEditor/context/FormContext';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const { getFieldName } = useFormContext();
  const [{ value }] = useField<ICheckbox>(props.idx);
  const { ...fieldProps } = value.data.value;

  return (
    <BlockWrapper idx={props.idx}>
      <div>
        <CheckboxField
          alignment="leading"
          style={{ display: 'flex', flexDirection: 'column' }}
          {...fieldProps}
          name={getFieldName(fieldProps.name)}

          inline
        />
      </div>
    </BlockWrapper>

  );
}
