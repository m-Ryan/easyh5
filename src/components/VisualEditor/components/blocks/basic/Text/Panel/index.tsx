import React from 'react';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';

export function Panel() {
  const { focusBlock } = useTemplate();

  if (!focusBlock) return null;

  return (
    <Stack vertical>
      <Font />
    </Stack>
  );
}
