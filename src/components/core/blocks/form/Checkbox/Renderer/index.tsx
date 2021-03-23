import React from 'react';
import { ICheckbox } from '..';
import { useField } from 'formik';
import { CheckboxField } from '@/components/core/Form';
import { useForm } from '@/hooks/useForm';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const { getFieldName } = useForm();
  const [{ value }] = useField<ICheckbox>(props.idx);
  const { ...fieldProps } = value.data.value;

  return (
    <RenderBlockWrapper idx={props.idx}>
      <div>
        <CheckboxField
          alignment="leading"
          style={{ display: 'flex', flexDirection: 'column' }}
          {...fieldProps}
          name={getFieldName(fieldProps.name)}
        />
      </div>
    </RenderBlockWrapper>

  );
}
