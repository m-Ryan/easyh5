import React, { useMemo } from 'react';
import {
  ColorPickerField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { TextStyle } from '@/components/TextStyle';
import { TextAlign } from './TextAlign';
import { getOptionsByStringArray } from '@VisualEditor/utils/getOptionsByStringArray';
import { Animation } from './Animation';
import { Link } from './Link';

const whiteSpaceListOptions = getOptionsByStringArray([
  'inherit',
  'initial',
  'revert',
  'unset',
  '-moz-pre-wrap',
  'break-spaces',
  'normal',
  'nowrap',
  'pre',
  'pre-line',
  'pre-wrap',
]);

const textDecorationOptions = getOptionsByStringArray([
  'none',
  'underline',
  'overline',
  'line-through',
  'blink',
  'inherit',
]);

const fontWeightOptions = getOptionsByStringArray(['normal', 'bold', 'bolder']);

const fontStyleOptions = getOptionsByStringArray(['normal', 'italic']);

export default function Font() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <Stack key={focusIdx} vertical spacing='extraTight'>
        <Link />
        <Animation />
        <TextStyle variation='strong' size='large'>
          字体
        </TextStyle>
        <TextField label='字体' name={`${focusIdx}.style.fontFamily`} inline />
        <ColorPickerField
          label='颜色'
          name={`${focusIdx}.style.color`}
          inline
          alignment='center'
        />
        <TextField label='大小' name={`${focusIdx}.style.fontSize`} inline />
        <TextField label='行高' name={`${focusIdx}.style.lineHeight`} inline />
        <TextField label='样式' name={`${focusIdx}.style.lineHeight`} inline />
        <SelectField
          label='换行方式'
          name={`${focusIdx}.style.whiteSpace`}
          options={whiteSpaceListOptions}
          inline
        />
        <SelectField
          label='文本装饰'
          name={`${focusIdx}.style.textDecoration`}
          options={textDecorationOptions}
          inline
        />
        <RadioGroupField
          label='加粗'
          name={`${focusIdx}.style.fontWeight`}
          options={fontWeightOptions}
          inline
        />
        <RadioGroupField
          label='斜体：'
          name={`${focusIdx}.style.fontStyle`}
          options={fontStyleOptions}
          inline
        />

        <TextAlign />
      </Stack>
    );
  }, [focusIdx]);
}
