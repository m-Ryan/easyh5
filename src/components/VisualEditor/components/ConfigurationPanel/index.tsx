import { Stack } from '@/components/Stack';
import { Card } from 'antd';
import React from 'react';
import { useTemplate } from '../../hooks/useTemplate';
import { findBlockByType } from '../../utils/findBlockByType';

export function ConfigurationPanel() {
  const { focusIdx, getValueByIdx } = useTemplate();
  const value = getValueByIdx(focusIdx);
  const block = value && findBlockByType(value.type);

  return (

    <Card title="模板属性">
      <Stack vertical>
        {block && <block.Panel />}
      </Stack>
    </Card>

  );
}