import React, { useMemo } from 'react';
import { TreeSelectField } from '@/components/core/Form';
import { actions } from '@/config/actions';
import { getFormatAction } from '@/utils/actions';
import { useDialog } from '@/hooks/useDialog';
import { useBlock } from '@/hooks/useBlock';

export function Actions() {
  const { focusIdx } = useBlock();
  const { dialogList } = useDialog();

  const options = useMemo(() => {
    return actions.map(item => ({
      value: item.name,
      label: item.label,
      selectable: item.name === 'none',
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
