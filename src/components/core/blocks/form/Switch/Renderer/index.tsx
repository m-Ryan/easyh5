import React from 'react';
import { ISwitch } from '..';
import { useField } from 'formik';
import { SwitchField } from '@/components/core/Form';
import { useFormContext } from '@/context/FormContext';
import { RenderBlockWrapper } from '@/components/core/wrapper/RenderBlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<ISwitch>(props.idx);
  const { checkedText, uncheckedText, ...fieldProps } = value.data.value;
  const { getFieldName } = useFormContext();

  return (
    <RenderBlockWrapper idx={props.idx}>
      <div>
        <SwitchField checkedChildren={checkedText} unCheckedChildren={uncheckedText} {...fieldProps} name={getFieldName(fieldProps.name)} inline />
      </div>
    </RenderBlockWrapper>

  );
}
