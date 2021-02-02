import React from 'react';
import { Stack } from '@/components/Stack';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';

export function Panel() {

  return (
    <Stack vertical>
      <WidthHeight />
      <Padding />
      <Margin />
      <Background />
    </Stack>
  );
}
