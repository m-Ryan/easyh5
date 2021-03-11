import React from 'react';
import { BasicField } from '@/components/ConfigurationPanel/components/Form/BasicField';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { SwitchField, TextField, } from '@/components/core/Form';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical>
      <BasicField />
      <SwitchField checkedChildren="开启" unCheckedChildren="关闭" inline label='默认值' name={`${focusIdx}.data.value.defaultValue`} />
      <TextField inline label='开启文案' name={`${focusIdx}.data.value.checkedText`} />
      <TextField inline label='关闭文案' name={`${focusIdx}.data.value.uncheckedText`} />
    </Stack>
  );

}
