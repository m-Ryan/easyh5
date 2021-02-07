import React, { useMemo } from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { InputNumberAdapter } from '@VisualEditor/utils/InputNumberAdapter';
import { TextStyle } from '@/components/TextStyle';
import { Collapse } from 'antd';

const { Panel } = Collapse;
export function Padding() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (

      <Panel header={<TextStyle size={'large'}>内边距</TextStyle>} key="Padding">
        <Stack vertical spacing="extraTight">
          <Stack wrap={false}>
            <Stack.Item fill>
              <TextField
                label="上"
                name={`${focusIdx}.style.paddingTop`}
                inline
                onChangeAdapter={InputNumberAdapter}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                label="下"
                name={`${focusIdx}.style.paddingBottom`}
                inline
                onChangeAdapter={InputNumberAdapter}
              />
            </Stack.Item>
          </Stack>

          <Stack wrap={false}>
            <Stack.Item fill>
              <TextField
                label="左"
                name={`${focusIdx}.style.paddingLeft`}
                inline
                onChangeAdapter={InputNumberAdapter}
              />
            </Stack.Item>
            <Stack.Item fill>
              <TextField
                label="右"
                name={`${focusIdx}.style.paddingRight`}
                inline
                onChangeAdapter={InputNumberAdapter}
              />

            </Stack.Item>
          </Stack>
        </Stack>
      </Panel>

    );
  }, [focusIdx]);
}
