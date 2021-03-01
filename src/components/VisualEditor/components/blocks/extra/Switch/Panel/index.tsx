import React from 'react';
import { BasicField } from '@VisualEditor/components/ConfigurationPanel/components/Form/BasicField';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { SwitchField, TextField, } from '@/components/Form';

export function Panel() {
  const { focusIdx } = useEditorContext();

  return (
    <Stack vertical>
      <BasicField />
      <SwitchField checkedChildren="开启" unCheckedChildren="关闭" inline label='默认值' name={`${focusIdx}.data.value.defaultValue`} />
      <TextField inline label='开启文案' name={`${focusIdx}.data.value.checkedText`} />
      <TextField inline label='关闭文案' name={`${focusIdx}.data.value.uncheckedText`} />
    </Stack>
  );

}
