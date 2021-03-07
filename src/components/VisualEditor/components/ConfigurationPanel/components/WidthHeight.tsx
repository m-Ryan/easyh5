import React, { useMemo } from 'react';
import { TextField } from '@VisualEditor/components/core/Form';
import { Stack } from '@VisualEditor/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

export function WidthHeight() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='宽'
            name={`${focusIdx}.style.width`}
            inline
            quickchange
          />
        </Stack.Item>
        <Stack.Item fill>
          <TextField
            label='高'
            name={`${focusIdx}.style.height`}
            inline
            quickchange
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx]);
}
