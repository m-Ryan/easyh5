import React, { useMemo } from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { InputNumberAdapter } from '@VisualEditor/utils/InputNumberAdapter';
import { TextStyle } from '@/components/TextStyle';

export function Margin() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle size={'large'}>外边距</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='上'
              name={`${focusIdx}.style.marginTop`}
              inline
              onChangeAdapter={InputNumberAdapter}
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='下'
              name={`${focusIdx}.style.marginBottom`}
              inline
              onChangeAdapter={InputNumberAdapter}
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='左'
              name={`${focusIdx}.style.marginLeft`}
              inline
              onChangeAdapter={InputNumberAdapter}
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='右'
              name={`${focusIdx}.style.marginRight`}
              inline
              onChangeAdapter={InputNumberAdapter}
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}
