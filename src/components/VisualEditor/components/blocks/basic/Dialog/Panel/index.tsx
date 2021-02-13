import React from 'react';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';

export function Panel() {

  return (
    <CollapsePanels options={[
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
