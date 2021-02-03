import React, { useMemo } from 'react';
import { useTemplate } from '@VisualEditor/hooks/useTemplate';
import { LinkOutlined } from '@ant-design/icons';
import { TextField } from '@/components/Form';

export function Link() {
  const { focusIdx } = useTemplate();

  return useMemo(() => {
    return (
      <TextField prefix={<LinkOutlined />} label="链接" name={`${focusIdx}.data.link`} inline />
    );
  }, [focusIdx]);
}
