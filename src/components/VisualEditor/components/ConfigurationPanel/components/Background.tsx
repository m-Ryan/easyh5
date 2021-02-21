import React, { useMemo } from 'react';
import { ColorPickerField, ImageUploaderField, SelectField, SwitchField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { TextStyle } from '@/components/TextStyle';

const backgroundRepeatOptions = [
  {
    value: 'none',
    label: '不重复',
  },
  {
    value: 'repeat',
    label: '重复',
  },
  {
    value: 'repeat-x',
    label: 'x轴重复',
  },
  {
    value: 'repeat-y',
    label: 'y轴重复',
  }
];

const onChangeAdapter = (url: string[]) => {
  return url ? `url(${url[0]})` : undefined;
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
          valueAdapter={((text: string) => text?.replace(/url\((.*)?\)/, '$1'))}
          onChangeAdapter={onChangeAdapter}
        />
        <SelectField
          label='背景重复'
          name={`${focusIdx}.style.backgroundRepleat`}
          options={backgroundRepeatOptions}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
