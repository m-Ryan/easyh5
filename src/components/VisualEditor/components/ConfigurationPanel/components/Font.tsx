import React, { useMemo } from 'react';
import { ColorPickerField, ImageUploaderField, TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import { TextStyle } from '@/components/TextStyle';
import { InputNumberAdapter } from '@VisualEditor/utils/InputNumberAdapter';

export default function Font() {
  const { focusIdx } = useTemplate();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing="extraTight">
        <TextStyle variation="strong" size="large">字体</TextStyle>
        <ColorPickerField label="颜色" name={`${focusIdx}.style.color`} inline alignment="center" />
        <TextField label="字体大小" name={`${focusIdx}.style.fontSize`} inline onChangeAdapter={InputNumberAdapter} />
      </Stack>
    );
  }, [focusIdx]);
}
