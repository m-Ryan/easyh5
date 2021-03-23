import React from 'react';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@/components/ConfigurationPanel/components/Padding';
import { Background } from '@/components/ConfigurationPanel/components/Background';
import { Margin } from '@/components/ConfigurationPanel/components/Margin';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';
import { CollapsePanels } from '@/components/CollapsePanels';
import { Decoration } from '@/components/ConfigurationPanel/components/Decoration';
import { Position } from '@/components/ConfigurationPanel/components/Position';
import { Stack } from '@/components/Stack';
import { TextField } from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';

export function Panel() {
  const { focusIdx } = useBlock();

  return (
    <CollapsePanels options={[
      {
        title: '表单配置',
        children: (
          <Stack>
            <TextField label='表单名称' name={`${focusIdx}.data.value.name`} inline />
          </Stack>
        ),
        active: true,
      },
      {
        title: '宽高',
        children: <WidthHeight />,
        active: true
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
      {
        title: '位置',
        children: <Position />,
        active: true,
      },
      {
        title: '装饰',
        children: <Decoration />,
        active: false,
      },
      {
        title: '额外',
        children: <Extra />,
        active: false,
      },
    ]}
    />
  );

}
