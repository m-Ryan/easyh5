import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { variables } from '@/config/variables';
import { getFormatVariable } from '@/utils/variables';
import { useEditorContext } from '@/hooks/useEditorContext';

const options = variables.map(item => ({
  value: item.name,
  label: item.label,
  selectable: item.name === 'none',
  options: item.variables.map(variable => ({
    value: getFormatVariable(item.name, variable.name),
    label: variable.label,
  }))
}));

export function Variables() {
  const { focusIdx } = useEditorContext();
  return (

    <TreeSelectField title="变量"
      treeDefaultExpandAll
      style={{ width: '100%' }} label='绑定变量'
      name={`${focusIdx}.data.variable`}
      inline options={options}

    />

  );
}
