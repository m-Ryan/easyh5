import React from 'react';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';
import { TextField } from '@/components/Form';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { Stack } from '@/components/Stack';

export function Panel() {
  const { focusIdx } = useEditorContext();

  return (
    <CollapsePanels
      options={[
        {
          title: '模板配置',
          children: (
            <Stack>
              <TextField label='模板名称' name={'title'} inline />
              <TextField
                label='页面标题'
                name={`${focusIdx}.data.title`}
                inline
              />
            </Stack>
          ),
          active: true,
        },
        {
          title: '宽高',
          children: <WidthHeight />,
          active: true,
        },
        {
          title: '边距',
          children: (
            <>
              <Padding />
              <Margin />
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
