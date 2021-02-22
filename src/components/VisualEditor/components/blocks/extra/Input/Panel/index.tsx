import React from 'react';
import { BasicField } from '@VisualEditor/components/ConfigurationPanel/components/BasicField';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { SelectField } from '@/components/Form';
import { getOptionsByStringArray } from '@VisualEditor/utils/getOptionsByStringArray';

const typeOptions = getOptionsByStringArray([
  'text',
  'password',
  'number',
]);

export function Panel() {
  const { focusIdx, focusBlock } = useEditorContext();
  console.log(focusBlock);
  return (
    <Stack.Item fill>
      <BasicField />
      <SelectField
        label='类型'
        name={`${focusIdx}.data.value.type`}
        options={typeOptions}
        inline
      />
    </Stack.Item>
  );

}
