import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { Card, message, Tabs } from 'antd';
import { Input } from 'antd';
import React, { useCallback, useMemo } from 'react';
import { findBlockByType, getValueByIdx } from '../../utils/block';
import jsonFormat from 'json-format';
import { useBlock } from '@/hooks/useBlock';

export function ConfigurationPanel() {
  const { focusIdx, setValueByIdx, values } = useBlock();
  const value = getValueByIdx(values, focusIdx);

  const block = value && findBlockByType(value.type);

  const code = useMemo(() => {

    return jsonFormat(value, {
      type: 'space',
      size: 2
    }) || '';
  }, [value]);

  const onChaneCode = useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    try {
      const parseValue = JSON.parse(event.target.value);
      setValueByIdx(focusIdx, parseValue);
    } catch (error) {
      message.error(error.message);
    }

  }, [focusIdx, setValueByIdx]);

  if (!block) return null;

  return (
    <Tabs tabBarStyle={{ paddingLeft: 20 }}>
      <Tabs.TabPane key="配置" tab="配置">
        <Card
          bodyStyle={{ paddingTop: 0, backgroundColor: '#fff' }}
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
      </Tabs.TabPane>
      <Tabs.TabPane key="源码" tab="查看源码">
        <Card>
          <Input.TextArea key={code} defaultValue={code} autoSize={{ maxRows: 25 }} onBlur={onChaneCode} />
        </Card>

      </Tabs.TabPane>
    </Tabs>

  );
}
