import React from 'react';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { CollapsePanels } from '@/components/CollapsePanels';
import { Stack } from '@/components/Stack';
import { TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';

export function Panel() {
  const { focusIdx } = useBlock();
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
