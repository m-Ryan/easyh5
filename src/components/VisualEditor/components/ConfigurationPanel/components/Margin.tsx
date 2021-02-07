import React, { useMemo } from 'react';
import { TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { InputNumberAdapter } from '@VisualEditor/utils/InputNumberAdapter';
import { TextStyle } from '@/components/TextStyle';
import { Collapse } from 'antd';

const { Panel } = Collapse;
export function Margin() {
  const { focusIdx } = useEditorContext();

  return (

    <Panel header={<TextStyle size={'large'}>外边距</TextStyle>} key='Margin'>
      333
    </Panel>

  );
}
