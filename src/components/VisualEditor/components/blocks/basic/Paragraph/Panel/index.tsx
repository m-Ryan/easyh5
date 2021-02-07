import React from 'react';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { Padding } from '@VisualEditor/components/ConfigurationPanel/components/Padding';
import Font from '@VisualEditor/components/ConfigurationPanel/components/Font';
import { Margin } from '@VisualEditor/components/ConfigurationPanel/components/Margin';
import { Position } from '@VisualEditor/components/ConfigurationPanel/components/Position';
import { Collapse } from 'antd';
import { TextStyle } from '@/components/TextStyle';
export function Panel() {
  const { focusBlock } = useEditorContext();

  if (!focusBlock) return null;

  return (
    <Collapse accordion>
      <Collapse.Panel header={<TextStyle size={'large'}>外边距</TextStyle>} key='111' />
      <Font />
      <Padding />
      <Margin />
      <Position />

    </Collapse>

  );
}
