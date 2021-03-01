import React from 'react';
import { useField } from 'formik';
import { SwitchField } from '@/components/Form';
import Draggable from '@VisualEditor/components/Draggable';
import { ISwitch } from '..';

type IProps = {
  idx: string;
};

export function Editor(props: IProps) {
  const [{ value }] = useField<ISwitch>(props.idx);
  const { checkedText, uncheckedText, ...fieldProps } = value.data.value;

  return (
    <Draggable idx={props.idx} data={value}>
      <div>
        <SwitchField checkedChildren={checkedText} unCheckedChildren={uncheckedText} {...fieldProps} name={`${props.idx}.data.value.defaultValue`} inline />
      </div>
    </Draggable>
  );
}
