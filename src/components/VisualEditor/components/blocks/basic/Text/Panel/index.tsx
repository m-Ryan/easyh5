import React from 'react';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';

export function Panel() {
  const { focusBlock } = useEditorContext();

  if (!focusBlock) return null;

  return (
    <Stack vertical>
      <Font />
      <Position />
    </Stack>
  );
}
