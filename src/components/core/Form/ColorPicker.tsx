import { Popover } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';

export interface ColorPickerProps {
  onChange?: (val: string) => void;
  value?: string;
  label: string;
  size?: 'small' | 'normal' | 'large';
}

export function ColorPicker(props: ColorPickerProps) {
  const [color, setColor] = useState('#fff');
  const { value = '#fff', onChange } = props;

  useEffect(() => {
    setColor(value);
  }, [value]);

  const onChangeColor = useCallback((color: ColorResult) => {
    const newColor = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setColor(newColor);
    onChange?.(newColor);
  }, [setColor, onChange]);

  const size = useMemo(() => {
    switch (props.size) {
      case 'small': return 20;
      case 'large': return 40;
    }
    return 30;
  }, [props.size]);

  return (
    <Popover
      content={(
        <SketchPicker
          color={color}
          onChange={onChangeColor}
        />
      )}
      title={props.label}
      trigger='click'
    >
      <div style={{
        display: 'inline-block',
        height: size,
        width: size,
        padding: 4,
        border: '1px solid #e6e6e6',
        borderRadius: 4,
        fontSize: 0,
        position: 'relative',
        cursor: 'pointer',
      }}
      ><span style={{
        position: 'relative',
        display: 'block',
        border: '1px solid #999',
        borderRadius: 2,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        backgroundColor: value
      }}
      />
        <DownOutlined />
      </div>
    </Popover>

  );
}