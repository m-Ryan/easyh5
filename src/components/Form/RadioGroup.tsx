
import { Radio } from 'antd';
import { RadioChangeEvent, RadioGroupProps as AntdRadioGroupProps } from 'antd/lib/radio';
import { merge } from 'lodash';
import React from 'react';

export interface RadioGroupProps extends AntdRadioGroupProps {
  options: Array<{ value: string; label: React.ReactNode; }>;
  onChange?: (e: RadioChangeEvent) => void;
  value?: string;
}

export function RadioGroup(props: RadioGroupProps) {
  return (
    <Radio.Group style={merge({ width: '100%' }, props.style)} value={props.value} onChange={props.onChange}>
      {
        props.options.map((item, index) => <Radio.Button key={index} value={item.value}>{item.label}</Radio.Button>)
      }
    </Radio.Group>
  );
}