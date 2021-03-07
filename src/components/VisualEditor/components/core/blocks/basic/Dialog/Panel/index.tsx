import React from 'react';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';
import { Stack } from '@VisualEditor/components/Stack';
import { TextField } from '@VisualEditor/components/core/Form';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

export function Panel() {
  const { focusIdx } = useEditorContext();
  return (
    <CollapsePanels options={[
      {
        title: '弹窗配置',
        children: (
          <Stack>
            <TextField label='弹窗名称' name={`${focusIdx}.data.value.name`} inline />
          </Stack>
        ),
        active: true,
      },
      {
        title: '边距',
        children: (
          <>
            <Padding />
          </>
        ),
        active: true,
      },
      {
        title: '背景',
        children: <Background />,
        active: true,
      },
    ]}
    />
  );

}
