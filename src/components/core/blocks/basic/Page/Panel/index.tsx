import React from 'react';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Margin } from '@/components/ConfigurationPanel/components/Margin';
import { CollapsePanels } from '@/components/CollapsePanels';
import { SwitchField, TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { Help } from '@/components/Help';

export function Panel() {
  const { focusIdx, focusBlock } = useBlock();

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
              <Stack spacing="extraTight" alignment="center">
                <SwitchField name={`${focusIdx}.data.value.h5.enabled`} inline label="h5模式" />
                <Help title="h5模式会对px单位进行rem转换，以适应移动端" style={{ fontSize: 20 }} />
              </Stack>

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
