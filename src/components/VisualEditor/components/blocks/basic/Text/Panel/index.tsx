import React from 'react';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';
import { Extra } from '@VisualEditor/components/ConfigurationPanel/components/Extra';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';

export function Panel() {

  return (
    <CollapsePanels options={[
      {
        title: '字体',
        children: <Font type="text" />,
        active: true
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
