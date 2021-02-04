import React, { useMemo } from 'react';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { LinkOutlined } from '@ant-design/icons';
import { TextField } from '@/components/Form';

export function Link() {
  const { focusIdx } = useEditorContext();

  return useMemo(() => {
    return (
      <TextField
        prefix={<LinkOutlined />}
        label='链接'
        name={`${focusIdx}.data.link`}
        inline
      />
    );
  }, [focusIdx]);
}
