import React from 'react';
import { SelectField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

export function FieldRule() {
  const { focusIdx } = useEditorContext();

  const ruleOptions = [
    {
      value: '',
      label: '无'
    },
    {
      value: 'required',
      label: '必填'
    },
    {
      value: 'email',
      label: '邮箱'
    },
    {
      value: 'phone',
      label: '手机号'
    },

  ];

  return (
    <Stack vertical>
      <SelectField
        mode="multiple"
        style={{ display: 'flex', flexDirection: 'column' }}
        alignment="leading" label="检验规则"
        name={`${focusIdx}.data.value.validate`}
        inline
        options={ruleOptions}
      />
    </Stack>
  );
}
