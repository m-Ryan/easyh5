import React from 'react';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';
import { NumberField, SwitchField, TextField } from '@/components/Form';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { Stack } from '@/components/Stack';

export function Panel() {
  const { focusIdx, focusBlock } = useEditorContext();

  if (!focusBlock) return null;
  return (
    <CollapsePanels
      options={[
        {
          title: '模板配置',
          children: (
            <Stack vertical>
              <TextField label='模板名称' name={'title'} inline />
              <TextField
                label='页面标题'
                name={`${focusIdx}.data.value.title`}
                inline
              />
              <SwitchField name={`${focusIdx}.data.value.h5.enabled`} inline label="h5模式" />
              {
                focusBlock.data.value.h5.enabled && (
                  <>
                    <NumberField
                      label='设计稿宽'
                      name={`${focusIdx}.data.value.h5.pageWidth`}
                      inline
                      helpText="根据设计稿大小进行缩放"
                    />
                    {/* <NumberField
                      label='最大宽度'
                      name={`${focusIdx}.data.value.h5.pageMaxWidth`}
                      inline
                      helpText="超过最大宽度后，以最大宽度展示"
                    /> */}
                  </>
                )
              }

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
