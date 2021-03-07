import React from 'react';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';
import { Extra } from '@VisualEditor/components/ConfigurationPanel/components/Extra';
import { CollapsePanels } from '@VisualEditor/components/CollapsePanels';
import { WidthHeight } from '@VisualEditor/components/ConfigurationPanel/components/WidthHeight';
import { Background } from '@VisualEditor/components/ConfigurationPanel/components/Background';

export function Panel() {

  return (
    <CollapsePanels options={[
      {
        title: '字体',
        children: <Font type="text" />,
        active: true
      },
      {
        title: '宽高',
        children: <WidthHeight />
      },
      {
        title: '位置',
        children: <Position />
      },
      {
        title: '背景',
        children: <Background />
      },
      {
        title: '额外',
        children: <Extra />
      },
    ]}
    />
  );

}
