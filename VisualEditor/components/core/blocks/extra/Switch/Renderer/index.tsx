import React from 'react';
import { ISwitch } from '..';
import { useField } from 'formik';
import { SwitchField } from '@VisualEditor/components/core/Form';
import { useFormContext } from '@VisualEditor/context/FormContext';
import { BlockWrapper } from '@VisualEditor/components/core/wrapper/BlockWrapper';

type IProps = {
  idx: string;
};

export function Renderer(props: IProps) {
  const [{ value }] = useField<ISwitch>(props.idx);
  const { checkedText, uncheckedText, ...fieldProps } = value.data.value;
  const { getFieldName } = useFormContext();

  return (
    <BlockWrapper idx={props.idx}>
      <div>
        <SwitchField checkedChildren={checkedText} unCheckedChildren={uncheckedText} {...fieldProps} name={getFieldName(fieldProps.name)} inline />
      </div>
    </BlockWrapper>

  );
}
