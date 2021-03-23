import React from 'react';
import Font from '@/components/ConfigurationPanel/components/Font';
import { Position } from '@/components/ConfigurationPanel/components/Position';
import { Extra } from '@/components/ConfigurationPanel/components/Extra';
import { CollapsePanels } from '@/components/CollapsePanels';
import { WidthHeight } from '@/components/ConfigurationPanel/components/WidthHeight';
import { Background } from '@/components/ConfigurationPanel/components/Background';

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
