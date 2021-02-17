import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/Form';
import { Stack } from '@/components/Stack';
import { actions } from '@VisualEditor/config/actions';
import { getFormatAction } from '@VisualEditor/utils/actions';
import { useEditorContext } from '@VisualEditor/hooks/useEditorContext';
import { useDialog } from '@VisualEditor/hooks/useDialog';

export function Actions() {
  const { focusIdx } = useEditorContext();
  const { dialogList } = useDialog();

  const options = useMemo(() => {
    return actions.map(item => ({
      value: item.name,
      label: item.label,
      selectable: false,
      options:
        (item.name === 'dialogOpen' || item.name === 'dialogClose')
          ? dialogList.map(dialog => ({
            value: getFormatAction(item.name, dialog.data.value.uid),
            label: <span style={{ fontSize: 12 }}>{item.label + '-' + dialog.data.value.name}</span>
          }))
          : item.actions.map(action => ({
            value: getFormatAction(item.name, action.name),
            label: <span style={{ fontSize: 12 }}>{item.label + '-' + action.label}</span>,
          }))
    }));

  }, [dialogList]);

  return (
    <TreeSelectField title="动作"
      treeDefaultExpandAll
      style={{ width: '100%' }} label='绑定动作'
      name={`${focusIdx}.data.action`}
      inline options={options}

    />
  );
}
