import { Stack } from '@/components/Stack';
import React, { useEffect, useMemo, useState } from 'react';
import { DesktopOutlined, EyeOutlined, BorderOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import { TextStyle } from '@/components/TextStyle';

export const platformType = [
  {
    value: 'laptop',
    label: '电脑',
    icon: <DesktopOutlined />
  },
  {
    value: 'mobile',
    label: '手机',
    icon: <DesktopOutlined />
  },
  {
    value: 'other',
    label: '其它',
    icon: <BorderOutlined />
  },
];

export const scaleOptions = [
  {
    value: 50,
    label: '50%',
  },
  {
    value: 75,
    label: '75%',
  },
  {
    value: 100,
    label: '100%',
  },
  {
    value: 125,
    label: '125%',
  },
  {
    value: 150,
    label: '150%',
  },
];

export function useDeviceToolbar() {
  const [preview, setPrevie] = useState(false);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(768);
  const [selectedPlatform, setSelectedPlatform] = useState('laptop');
  const [scale, setScale] = useState(75);
  const isSelectedOther = selectedPlatform === 'other';

  const container = document.getElementById('VisualEditorEditMode');

  useEffect(() => {
    if (container) {
      container.style.width = width + 'px';
    }
  }, [width, container]);

  useEffect(() => {
    if (selectedPlatform === 'laptop') {
      setWidth(1200);
      setHeight(768);
    }
    if (selectedPlatform === 'mobile') {
      setWidth(375);
      setHeight(768);
    }
  }, [selectedPlatform]);

  const content = useMemo(() => {
    return (
      <div style={{ backgroundColor: '#fff', padding: 10 }}>
        <Stack distribution="equalSpacing">
          <Stack>
            <Stack spacing="extraTight">
              {
                platformType.map(item => (
                  <Button key={item.value}
                    type={selectedPlatform === item.value ? 'primary' : undefined}
                    ghost={selectedPlatform === item.value}
                    size="small"
                    onClick={() => setSelectedPlatform(item.value)}
                  >
                    {item.icon}
                  </Button>
                ))
              }
            </Stack>
            <Stack spacing="extraTight">
              <Input
                disabled={!isSelectedOther}
                size="small" style={{ width: 50 }}
                value={width}
                onChange={e => setWidth(+e.target.value)}
              />
              <TextStyle>X</TextStyle>
              <Input
                disabled={!isSelectedOther}
                size="small"
                style={{ width: 50 }}
                value={height}
                onChange={e => setHeight(+e.target.value)}
              />
              <Select value={scale} onChange={e => setScale(e)} size="small" style={{ width: 75 }}>
                {
                  scaleOptions.map(item => <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>)
                }
              </Select>
            </Stack>
          </Stack>
          <Stack>
            <Button onClick={() => setPrevie(flag => !flag)}><EyeOutlined /></Button>
          </Stack>
        </Stack>
      </div>
    );
  }, [height, isSelectedOther, scale, selectedPlatform, width]);

  return {
    content,
    width,
    height,
    scale,
    preview
  };
}