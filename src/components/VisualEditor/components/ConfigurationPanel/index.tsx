import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { Card } from 'antd';
import React from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { findBlockByType } from '../../utils/findBlockByType';

export function ConfigurationPanel() {
  const { focusIdx, getValueByIdx } = useEditorContext();
  const value = getValueByIdx(focusIdx);
  const block = value && findBlockByType(value.type);

  if (!block) return null;

  return (
    <Card
      bodyStyle={{ padding: 0, backgroundColor: '#fff' }}
      title={(
        <TextStyle variation='strong' size='large'>
          {block.name}属性
        </TextStyle>
      )}
    >
      <Stack vertical>
        {<block.Panel />}
        <Stack.Item />
        <Stack.Item />
        <Stack.Item />
        <Stack.Item />
      </Stack>
    </Card>
  );
}
