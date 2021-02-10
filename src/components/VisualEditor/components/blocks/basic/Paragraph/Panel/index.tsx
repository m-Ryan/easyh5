import React from 'react';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';
import { Extra } from '@VisualEditor/components/ConfigurationPanel/components/Extra';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';

export function Panel() {

  return (
    <CollapsePanels options={[
      {
        title: '字体',
        children: <Font />,
        active: true
      },
      {
        title: '边距',
        children: (
          <>
            <Padding />
            <Margin />
          </>
        )
      },
      {
        title: '位置',
        children: <Position />
      },
      {
        title: '额外',
        children: <Extra />
      },
    ]}
    />
  );

}
