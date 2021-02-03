import React from 'react';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';

export function Panel() {
  const { focusBlock } = useTemplate();

  if (!focusBlock) return null;

  return (
    <Stack vertical>
      <Font />
      <Padding />
      <Margin />
      <Position />
    </Stack>
  );
}
