import React from 'react';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Margin } from '@/components/ConfigurationPanel/components/Margin';
import { CollapsePanels } from '@/components/CollapsePanels';
import { TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';

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
