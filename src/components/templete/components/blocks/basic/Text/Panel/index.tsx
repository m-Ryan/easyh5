import React from 'react';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@/components/templete/hooks/useTemplate';
import WidthHeight from '@/components/templete/components/ConfigurationPanel/components/WidthHeight';
import Margin from '@/components/templete/components/ConfigurationPanel/components/Margin';
import Padding from '@/components/templete/components/ConfigurationPanel/components/Padding';
import Background from '@/components/templete/components/ConfigurationPanel/components/Background';



export default function Panel() {
  const { focusBlock } = useTemplate();

  if (!focusBlock) return null;

  return (
    <Stack vertical>
      <WidthHeight />
      <Padding />
      <Background />
    </Stack>
  );
}
