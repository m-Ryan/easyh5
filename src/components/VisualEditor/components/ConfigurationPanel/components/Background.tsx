import React, { useMemo } from 'react';
import { ColorPickerField, ImageUploaderField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { TextStyle } from '@/components/TextStyle';

const onChangeAdapter = (url: string) => {
  return url ? `url(${url})` : undefined;
};

export function Background() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <TextStyle variation='strong' size='large'>
          背景
        </TextStyle>
        <ColorPickerField
          label='颜色'
          name={`${focusIdx}.style.backgroundColor`}
          inline
          alignment='center'
        />
        <ImageUploaderField
          label='背景图'
          name={`${focusIdx}.style.backgroundImage`}
          inline
          onChangeAdapter={onChangeAdapter}
        />
      </Stack>
    );
  }, [focusIdx]);
}
