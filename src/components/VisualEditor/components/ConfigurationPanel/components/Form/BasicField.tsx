import React from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

export function BasicField() {
  const { focusIdx } = useEditorContext();

  return (
    <Stack vertical>
      <TextField label='表单列名' quickchange name={`${focusIdx}.data.value.name`} inline />
      <TextField label='标签 ' quickchange name={`${focusIdx}.data.value.label`} inline />
      <TextField label='占位符' quickchange name={`${focusIdx}.data.value.placeholder`} inline />
    </Stack>
  );
}
