import React from 'react';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';
import { TextField } from '@/components/core/Form';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical>
      <TextField label='按钮文案' name={`${focusIdx}.data.value.title`} inline />
      <Extra />
    </Stack>
  );

}
