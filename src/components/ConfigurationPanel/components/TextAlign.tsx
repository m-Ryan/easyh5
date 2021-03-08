import React, { useMemo } from 'react';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@/hooks/useEditorContext';
import { RadioGroupField } from '@/components/core/Form';

const textAlignOptions = [
  {
    value: 'left',
    label: 'left',
  },
  {
    value: 'center',
    label: 'center',
  },
  {
    value: 'right',
    label: 'right',
  },
];

export function TextAlign() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <Stack>
        <RadioGroupField
          label='对齐方式'
          name={`${focusIdx}.style.textAlign`}
          options={textAlignOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
