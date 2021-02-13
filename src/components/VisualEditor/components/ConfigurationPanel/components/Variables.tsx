import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { variables } from '@VisualEditor/config/variables';
import { getFormatVariable } from '@VisualEditor/utils/variables';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

const options = variables.map(item => ({
  value: item.name,
  label: item.label,
  options: item.variables.map(variable => ({
    value: getFormatVariable(item.name, variable.name),
    label: variable.label,
  }))
}));

export function Variables() {
  const { focusIdx } = useEditorContext();
  return (
    <Stack spacing='none'>
      <TreeSelectField title="变量"
        treeDefaultExpandAll
        style={{ width: 200 }} label='绑定变量'
        name={`${focusIdx}.data.variable`}
        inline options={options}

      />
    </Stack>
  );
}
