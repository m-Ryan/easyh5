import React, { useMemo } from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { FieldRule } from './FieldRule';

function validateEmail(value) {

  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  console.log('validateEmail', value, error);
  return error;
}

export function BasicField() {
  const { focusIdx } = useEditorContext();

  return (
    <Stack vertical>
      <TextField validate={validateEmail} label='表单列名' quickchange name={`${focusIdx}.data.value.name`} inline />
      <TextField label='标签 ' quickchange name={`${focusIdx}.data.value.label`} inline />
      <TextField label='占位符' quickchange name={`${focusIdx}.data.value.placeholder`} inline />
      <FieldRule />
    </Stack>
  );
}
