import React, { useMemo } from 'react';
import {
  SelectField,
} from '@/components/Form';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import './animate.scss';

const animationOptions = [
  {
    value: 'none',
    label: '无',
  },
  {
    value: 'app-animate-skip 1s both infinite',
    label: '跳跃',
  },
  {
    value: 'app-animate-breathe 1s linear both infinite',
    label: '呼吸',
  },
  {
    value: 'app-animate-flash 1s linear both infinite',
    label: '闪动',
  },
  {
    value: 'app-animate-rotate 1s linear both infinite',
    label: '旋转',
  },
];

export function Animation() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <SelectField
        label='动画'
        name={`${focusIdx}.style.animation`}
        options={animationOptions}
        inline
      />
    );
  }, [focusIdx]);
}
