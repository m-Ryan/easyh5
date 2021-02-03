import React, { useMemo } from 'react';;
import { Stack } from '@/components/Stack';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import { RadioGroupField } from '@/components/Form';

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
  const { focusIdx } = useTemplate();

  return useMemo(() => {
    return (
      <Stack >
        <RadioGroupField label="对齐方式" name={`${focusIdx}.style.textAlign`} options={textAlignOptions} inline />
      </Stack>
    );
  }, [focusIdx]);
}
