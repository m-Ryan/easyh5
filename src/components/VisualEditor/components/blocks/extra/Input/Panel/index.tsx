import React from 'react';
import { BasicField } from '@VisualEditor/components/ConfigurationPanel/components/Form/BasicField';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { NumberField, SelectField, } from '@/components/Form';
import { getOptionsByStringArray } from '@VisualEditor/utils/getOptionsByStringArray';
import { FieldRule } from '@VisualEditor/components/ConfigurationPanel/components/Form/FieldRule';

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
