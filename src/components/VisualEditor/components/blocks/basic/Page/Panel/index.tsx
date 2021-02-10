import React from 'react';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';

export function Panel() {

  return (
    <CollapsePanels options={[
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
    ]}
    />
  );

}
