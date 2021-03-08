import React from 'react';
import { BasicField } from '@/components/ConfigurationPanel/components/Form/BasicField';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@/hooks/useEditorContext';
import { NumberField, SelectField, } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';

const typeOptions = getOptionsByStringArray([
  'text',
  'password',
  'number',
]);

export function Panel() {
  const { focusIdx } = useEditorContext();

  return (
    <Stack vertical>
      <BasicField />
      <NumberField label='长度限制' name={`${focusIdx}.data.value.maxLength`} inline />
      <SelectField
        label='类型'
        name={`${focusIdx}.data.value.type`}
        options={typeOptions}
        inline
      />
    </Stack>
  );

}
