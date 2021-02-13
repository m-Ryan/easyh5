import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { actions } from '@VisualEditor/config/actions';
import { getFormatAction } from '@VisualEditor/utils/actions';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';

const options = actions.map(item => ({
  value: item.name,
  label: item.label,
  options: item.variables.map(variable => ({
    value: getFormatAction(item.name, variable.name),
    label: variable.label,
  }))
}));

export function Actions() {
  const { focusIdx } = useEditorContext();
  return (
    <Stack spacing='none'>
      <TreeSelectField title="动作"
        treeDefaultExpandAll
        style={{ width: 200 }} label='绑定动作'
        name={`${focusIdx}.data.action`}
        inline options={options}

      />
    </Stack>
  );
}
