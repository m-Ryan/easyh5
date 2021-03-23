import React from 'react';
import { BasicField } from '@/components/ConfigurationPanel/components/Form/BasicField';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { AddItemField, SwitchField, } from '@/components/core/Form';
import { TextStyle } from '@/components/TextStyle';
import { FieldRule } from '@/components/ConfigurationPanel/components/Form/FieldRule';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical>
      <BasicField />
      <SwitchField checkedChildren="开启" unCheckedChildren="关闭" inline label='默认值' name={`${focusIdx}.data.value.defaultValue`} />
      <SwitchField checkedChildren="垂直" unCheckedChildren="水平" inline label='展示方式' name={`${focusIdx}.data.value.vertical`} />
      <AddItemField label={<TextStyle size="medium">添加选项</TextStyle>} name={`${focusIdx}.data.value.options`} />

      <FieldRule />
    </Stack>
  );

}
