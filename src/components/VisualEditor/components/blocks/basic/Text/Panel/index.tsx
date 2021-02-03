import React from 'react';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';

export function Panel() {
  const { focusBlock } = useTemplate();

  if (!focusBlock) return null;

  return (
    <Stack vertical>
      <Font />
      <Position />
    </Stack>
  );
}
