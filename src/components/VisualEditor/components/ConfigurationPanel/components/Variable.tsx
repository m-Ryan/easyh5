import React, { useMemo } from 'react';
import { SelectField, TextField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { TextStyle } from '@/components/TextStyle';
import { getOptionsByStringArray } from '@VisualEditor/utils/getOptionsByStringArray';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const positionOptions = getOptionsByStringArray([
  'static',
  'absolute',
  'relative',
  'fixed,',
]);

export function Variable() {
  const { focusIdx } = useEditorContext();

  return (
    <Stack spacing='none'>
      <SelectField
        style={{ width: 100 }}
        label='绑定变量'
        name={`${focusIdx}.data.variable`}
        options={positionOptions}
        inline
      />
      <SelectField
        style={{ width: 100 }}
        label='绑定变量'
        lableHidden
        name={`${focusIdx}.data.variable`}
        options={positionOptions}
        inline
      />
    </Stack>
  );
}
