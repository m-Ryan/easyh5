import { Stack } from '@/components/Stack';
import { Card } from 'antd';
import React from 'react';
import { useEditorContext } from '../../hooks/useEditorContext';
import { findBlockByType } from '../../utils/findBlockByType';

export function ConfigurationPanel() {
  const { focusIdx, getValueByIdx } = useEditorContext();
  const value = getValueByIdx(focusIdx);
  const block = value && findBlockByType(value.type);

  return (
    <Card bodyStyle={{ padding: 0 }} title='模板属性'>
      <Stack vertical>{block && <block.Panel />}</Stack>
    </Card>
  );
}
