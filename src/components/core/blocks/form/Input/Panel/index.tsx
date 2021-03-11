import React from 'react';
import { BasicField } from '@/components/ConfigurationPanel/components/Form/BasicField';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { NumberField, SelectField, TextField, } from '@/components/core/Form';
import { getOptionsByStringArray } from '@/utils/getOptionsByStringArray';
import { FieldRule } from '@/components/ConfigurationPanel/components/Form/FieldRule';

const typeOptions = getOptionsByStringArray([
  'text',
  'password',
  'number',
  'textarea'
]);

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical>
      <BasicField />
      <TextField label='占位符' quickchange name={`${focusIdx}.data.value.placeholder`} inline />
      <NumberField inline label='最大长度限制' name={`${focusIdx}.data.value.maxLength`} />
      <NumberField inline label='最小长度限制' name={`${focusIdx}.data.value.minLength`} />
      <SelectField
        label='类型'
        name={`${focusIdx}.data.value.type`}
        options={typeOptions}
        inline
      />
      <FieldRule />
    </Stack>
  );

}
